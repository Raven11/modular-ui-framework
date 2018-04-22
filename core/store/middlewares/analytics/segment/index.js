import EventTypes from './event/types';
import record from './client/record';

import { defaultMapper } from './event/configuration';
import { extractIdentifyFields } from './event/identify';
import { extractPageFields } from './event/page';
import { extractScreenFields } from './event/screen';
import { extractTrackFields } from './event/track';
import { extractAliasFields } from './event/alias';
import { extractGroupFields } from './event/group';
import { extractContextFields } from './event/context';

let writeKey='';
let contextData = {};

function recordEvent(writeKey: string, type: string, userId: string, fields: Array, spec: string | Object) {
  record(writeKey, type, this.contextData.Device.ID, {
    ...fields.eventPayload
  }, this.contextData);
}

function createTracker(writeKey, customOptions = {}) {
  const options = {
    mapper: { ...defaultMapper.mapper, ...customOptions.mapper }
  };
  this.writeKey = writeKey;
  return store => next => action => handleAction(store.getState.bind(store), next, action, options);
}

function appendAction(action: Object, analytics: Object | Array) {

  action.meta = {
      ...action.meta,
      analytics: Array.isArray(analytics) ? analytics : { ...analytics }
  };

  return action;
}

function handleAction(getState: Function, next: Function, action: Object, options: Object) {

  this.contextData = extractContextFields(getState);

  if (action.meta && action.meta.analytics) return handleSpec(next, action);

  if (typeof options.mapper[action.type] === 'function') {

    let analytics = options.mapper[action.type](getState, action);
    return handleSpec(next, appendAction(action, analytics));
  }

  if (typeof options.mapper[action.type] === 'string') {

    let analytics = {eventType: options.mapper[action.type]};
    return handleSpec(next, appendAction(action, analytics));
  }

  return next(action);
}

function handleSpec(next: Function, action: Object) {
  const spec = action.meta.analytics;

  if (Array.isArray(spec)) {
    spec.forEach(s => handleIndividualSpec(s, action));
  } else {
    handleIndividualSpec(spec, action);
  }

  return next(action);
}

function handleIndividualSpec(spec: string | Object, action: Object) {
  const type = getEventType(spec);

  // In case the eventType was not specified or set to `null`, ignore this individual spec.
  if (type && type.length) {
    const fields = getFields(type, spec.eventPayload || {}, action.type);

    if (fields instanceof Error) return warn(fields);

    recordEvent(this.writeKey, type, fields, spec);
  }
}

function getEventType(spec) {
  if (typeof spec === 'string') {
    return spec;
  }

  return spec.eventType;
}

function getFields(type: string, fields: Object, actionType: string) {
  const typeFieldHandlers = {
    [EventTypes.identify]: extractIdentifyFields,
    [EventTypes.page]: extractPageFields,
    [EventTypes.screen]: extractScreenFields,
    [EventTypes.track]: eventFields => extractTrackFields(eventFields, actionType),
    [EventTypes.alias]: extractAliasFields,
    [EventTypes.group]: extractGroupFields,
    [EventTypes.reset]: () => [],
  };

  return typeFieldHandlers[type](fields);
}

export {
  createTracker,
  EventTypes,
};