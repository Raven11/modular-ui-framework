import MetaUtils from '../generic/utils/MetaUtils';

export function setChildrenInitialStates(component,jsonResult) {
  let childrenStates = MetaUtils.processFormOnLoadMeta(component,jsonResult);
  return {
    type: 'UPDATE_CHILD_STATES',
    childrenStates:childrenStates
  }
}

export function updateChildState(component,newChildState) {
  console.log('action');
  console.log('blah');
  let key = newChildState.id;
  let value = newChildState.value;
  let result = {key:value};
  return {
    type: 'UPDATE_CHILD_STATE',
    newChildState:result
  }
}
