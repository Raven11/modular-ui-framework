import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import Utils from '../../schema_engine/Utils';
import PropTypeUtils from '../../schema_engine/PropTypeUtils';
import MUIComponent from '../MUIComponent';
import Modules from '../../modular_engine/modules';
import FormValidators from '../utils/FormValidators';
import LoadingIndicator from './LoadingIndicator';
import MetaUtils from '../utils/MetaUtils';

const COMPONENT_STATES = ['LOADING','ACTIVE'];
const ID_STATE_JSON_PATH = 'formProps.initial';

/**
 * FormComponent is a special container component that maintains all it's children
 * states. Like any typical form, this component gets all validation errors and maintains
 * it.
 *
 * It has hooks that can be configured in the configuration
 * Hooks supported are:-
 * * onLoad - to set children initial states
 * * onFormSubmit - to submit/store children states
 * * onChildStateChange - to do any action on the data received from the children
 *
 * Every child of FormComponent receives _updateChildState function. The child
 * can invoke the function whenever the state changes
 *
 * Additionally, any child that changes state to "FormSubmit", triggers onFormSubmit hook
 *
 */
class FormComponent extends MUIComponent {
  constructor(props){
    super(props,FormComponent.defaultStyle,props.style);
    this.state = {
      pendingErrors:{},
      childrenInitialProps:{},
    }

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
  // _updateChildState = (_id,_state,_name,_validators) => {
  //
  //   // for FormSubmit signal, we do not update the state
  //   if(_state === 'FormSubmit'){
  //     this._handleSubmit();
  //     return;
  //   }
  //
  //   var childrenState = {...this.state.childrenState};
  //   var pendingErrors = {...this.state.pendingErrors};
  //
  //   // update children state
  //   childrenState[_id] = _state;
  //
  //
  //   if((_validators !== null) && (_validators !== undefined)){
  //     let validator;
  //     let result;
  //
  //     for(var i in _validators){
  //       console.log(i,validator);
  //       validator = _validators[i];
  //       if(FormValidators.hasOwnProperty(validator.module)){
  //         if(validator.hasOwnProperty('args') && validator.args !== undefined){
  //           let fieldName = _name || _id;
  //           result = FormValidators[validator.module](_state,fieldName,...validator.args);
  //         }else{
  //           result = FormValidators[validator.module](_state,_id);
  //         }
  //         pendingErrors[_id] = result;
  //       }
  //       else{
  //         throw Error(`Validator ${validator} not found with id: ${_id}`);
  //       }
  //     }
  //   }
  //
  //   //update state
  //   if ((childrenState !== this.state.childrenState)||(pendingErrors !== this.state.pendingErrors)){
  //     this.setState({childrenState:childrenState,pendingErrors:pendingErrors});
  //   }
  // }

  _handleSubmit = () => {
    const modulePropName = "onFormSubmitModule";
    const modulePropPath = this.props.meta[modulePropName];
    if(this.props.meta.hasOwnProperty(modulePropName)){
      const moduleName = modulePropPath.moduleName;
      const args = modulePropPath.args;
      const next = modulePropPath.next;
      if(Modules.hasOwnProperty(moduleName)){
          if(args !== undefined){
            Modules[moduleName](this,...args);
          }else{
            Modules[moduleName](this);
          }
      }
    }
  }

  render(){
    let children = this.generateChildrenWithCallback(this.props.updateChildStateCallback,this.props.childrenStates,ID_STATE_JSON_PATH);
    let component = (
      <View style={this.props.style}>

      {this.props.componentState === 'LOADING' && <LoadingIndicator>
      </LoadingIndicator>
      }
        {children}
      </View>

    );
    if(this.props.scroll){
      component = (
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
        {component}
        </ScrollView>
      );
    }

    return super.render(component);
  }
}



FormComponent.defaultStyle = {

}
FormComponent.defaultProps = {
  scroll:false,
  initState:'ACTIVE',
}
FormComponent.propTypes = {
  scroll: React.PropTypes.bool,
  componentState:React.PropTypes.oneOf(COMPONENT_STATES),
}

export default FormComponent;
