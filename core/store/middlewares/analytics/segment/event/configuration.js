import EventTypes from './types';

const { identify, track, alias, group, reset, page } = EventTypes;

const defaultMapper = {
  mapper: {
    // {event_name} : event
    // {page_name} : page
    // {event_name} : event
    // {event_name} : event
    // {event_name} : event
  },
};

export {
  defaultMapper,
};