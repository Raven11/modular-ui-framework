import React from 'react';
import {Image,View,Text,TextInput} from 'react-native';
import { connect } from 'react-redux'
import Utils from '../../schema_engine/Utils';
import PropTypeUtils from '../../schema_engine/PropTypeUtils';
import MUIFormChildComponent from '../MUIFormChildComponent';

class TextInputView extends MUIFormChildComponent {
  constructor(props){
    super(props,TextInputView.defaultStyle,props.style);
  }

  _onTextChange = (text) => {
      this._updateStateToParentForm(text);
  }

  render(){
    this._processFormProps();
    const component = (<TextInput
         style={this.mergedStyles.textInput}
         placeholder={this.props.placeholder}
         onChangeText={this._onTextChange}
         value={this.initialValue}
         underlineColorAndroid={this.props.underlineColorAndroid}
       />);

    return super.render(component);
  }



}

const mapStateToProps = (state) => ({
	profile:state.profile,
  //fieldValue:state[ownProps.props.profile.binding]
})

TextInputView.defaultProps = {
  underlineColorAndroid:'transparent', /** otherwise it shows additional border in android **/
}
TextInputView.defaultStyle = {
  textInput:{
    height: 40,
    paddingLeft:10,
    paddingRight:10,
    borderColor:'black',
    borderWidth:1,
    }
}

TextInputView.propTypes = {
  //style: React.PropTypes.shape({text:textShapePropType}),
  placeholder: React.PropTypes.string,
}
export default connect(mapStateToProps)(TextInputView);
