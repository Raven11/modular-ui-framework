import _ from 'lodash';
const initialState = {
  childrenStates:{}
}

/**
 * Parses through currentChildrenStates and updates it with newChildrenStates
 * @param {Object} currentChildrenStates
 * @param {Object} newChildrenStates
 * @return {Object} updates currentChildrenStates with newChildrenStates
 */
function mergeChildrenStates(currentChildrenStates,newChildrenStates){
  let _current = _.clone(currentChildrenStates);
  for(var childId in newChildrenStates){
    _current[childId] = newChildrenStates[childId];
  }
  console.log(_current);
  return _current;
}

export default function FormComponentContainerReducers (state=initialState, action) {
  switch (action.type) {
    case 'SET_CHILD_INITIAL_STATES':
      return {
        ...state,
        jsonResult:action.jsonResult,
        componentState:'ACTIVE',
      }
      break;
    case 'UPDATE_CHILD_STATES':
      console.log(state);
      return {
        ...state,
        childrenStates:mergeChildrenStates(state.childrenStates,action.childrenStates),
        componentState:'ACTIVE'
      }
    case 'UPDATE_CHILD_STATE':
    return {
      ...state,
      childrenStates:mergeChildrenStates(state.childrenStates,action.newChildState),
      componentState:'ACTIVE'
      }
      break;

    default:
      return state;
  }
}
