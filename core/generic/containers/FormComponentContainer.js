import React from 'react';
import FormComponent from '../simple/FormComponent';
import MUIComponent from '../MUIComponent';
import { connect } from 'react-redux';
import MetaUtils from '../utils/MetaUtils';
import Actions from '../../modular_engine/actions';
import {setChildrenInitialStates,updateChildState} from '../../actions/FormComponentContainerActions';

const COMPONENT_STATES = ['LOADING','ACTIVE'];
const ID_STATE_JSON_PATH = 'formProps.initial';

class FormComponentContainer extends MUIComponent {
  constructor(props){
    super(props,FormComponent.defaultStyle,props.style);
    this.state = {
      childrenStates:{},
      pendingErrors:{},
    }

    console.log(this.props._childrenIds);
  }

  /**
   * 1. Set componentState to LOADING
   * 2. If onLoad hook is provided, invoke that
   */
  componentDidMount() {
      this.props.dispatch(Actions.updateState(this,'componentState','LOADING'));
      let result = MetaUtils.returnMetaModuleAction(this,'onLoad');
      this.props.dispatch(result.functionName(this,...result.args,setChildrenInitialStates));
  }



  /**
   * _updateChildState is passed onto its children while creating the children
   * It is invoked whenever child makes any state change
   * Additionally a child that changes the state to 'FormSubmit' invokes the onFormSubmit
   * hook
   *
   * @param  {String} _id         child id
   * @param  {String} _state      child state
   * @param  {String} _name       child name (for displaying in UI/errors)
   * @param  {Array} _validators child validators
   */
  _updateChildState = (_id,_state,_name,_validators) => {
    // Slim the function to have only needed stuff
    //
    console.log('update child state123');
    this.props.dispatch(updateChildState(this,{'id':_id,'value':_state}));
  }

  _handleSubmit = () => {
    // You should have a submit action name in JSON
    // Make the action call here
  }

  render(){
    let children = this.generateChildrenWithCallback(this._updateChildState,this.state.childrenInitialProps,ID_STATE_JSON_PATH);
    let component = (
      <FormComponent
            _childrenIds={this.props._childrenIds}
            _layoutName={this.props._layoutName}
            scroll={this.props.scroll}
            childrenStates={this.props.childrenStates}
            componentState={this.props.componentState}
            updateChildStateCallback={this._updateChildState}
      />
    )
    return super.render(component);
  }



}

// const mapStateToProps = (state,ownProps) => ({
//   profile:state.profile,
// });
//

function mergeChildStates(){

}

function getNewStateDict(object){
  let result = {};
  if(object.hasOwnProperty('newState')){
    for(var i in object['newState']){
      result[i] = object['newState'][i];
    }
  }
  console.log(result);
  return result;
}

/**
 * [mapStateToProps description]
 * ** componentState tells whether the component is loading or not
 * ** childrenStates tells what are the states of the children
 *    1. Get state from jsonResult (if there's any)
 *    2. Merge it with the present children states
 */
const mapStateToProps = (state,ownProps) => {
  let newStateDict = getNewStateDict(state.generic);
  let result = {...newStateDict};
  console.log(state.FormComponentContainerReducers);
  if(state.FormComponentContainerReducers.childrenStates !== undefined){
    result['childrenStates'] = state.FormComponentContainerReducers.childrenStates;
  }
  if(state.FormComponentContainerReducers.componentState !== undefined){
    result['componentState'] = state.FormComponentContainerReducers.componentState;
  }
  return result;
}


FormComponent.defaultStyle = {

}
FormComponent.defaultProps = {
    scroll:false,
    initState:'ACTIVE',
}
FormComponent.propTypes = {
    scroll: React.PropTypes.bool,
    initState:React.PropTypes.oneOf(COMPONENT_STATES),
}
export default connect(mapStateToProps)(FormComponentContainer);
