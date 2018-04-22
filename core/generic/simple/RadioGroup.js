import React from 'react';
import {View,Text,TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux'
import Utils from '../../schema_engine/Utils';
import RadioCircle from './RadioCircle';
import MUIFormChildComponent from '../MUIFormChildComponent';


class RadioGroup extends MUIFormChildComponent {
  constructor(props){
    super(props,RadioGroup.defaultStyle,props.style);
    this.state = {
      selectedValues: this._setInitialSelectedValues(),
    }
    this.radioType = this.props.radioType || 'singleSelect';

    //If initialValue is defined, do update the state
    this.state.selectedValues = this._selectState(this._getIndex(this.initialValue));
  }

  _setInitialSelectedValues = () => {
    var result = [];
    for(var i=0;i<this.props.noOfChildren;i++){
      result.push(false);
    }
    return result;
  }

  /**
   * Toggles states based on what is selectedIndex. It also depends on radioType
   * This does not update state!
   * @param  {number} index indexValue of selected state
   * @return {Object} selectedValues states of all the choices
   *
   * @example
   * For radioType 'singleSelect'
   * selectedValues: [false,false,false]
   * index: 0
   * result: [true,false,false]
   *
   * @example
   * For radioType 'toggleMultipleSelect'
   * selectedValues: [true,true,false]
   * index: 1
   * result: [true,false,false]
   */
  _selectState = (index) => {
    var selectedValues = [];

    // Select only one value incase of singleSelect
    if(this.radioType === 'singleSelect'){
      for(var i=0;i<this.props.noOfChildren;i++){
        if(i === index){
          selectedValues.push(true);
        }else{
          selectedValues.push(false);
        }
      }
    }
    else if(this.radioType === 'toggleMultipleSelect'){
      for(var i=0;i<this.props.noOfChildren;i++){
        if(i === index){
          selectedValues.push(!this.state.selectedValues[i]);
        }else{
          selectedValues.push(this.state.selectedValues[i]);
        }
      }
    }

    return selectedValues;
  }

  /**
   * Given a value, parse through all possible values and return an index
   * If nothing is found, return -1
   * @param  {String} value Value which needs to be searched among the possible
   *                        values
   * @return {number}       index of the searched value (-1 if not found)
   */
  _getIndex = (value) => {
    return this.props.btnChoices.indexOf(value);
  }

  _handleClick = (index) => {
    var selectedValues = this._selectState(index);
    this.setState({selectedValues});
    this._updateStateToParentForm(selectedValues);
  }

  _isRadioSelected = (index) => {
    return this.state.selectedValues[index];
  }

  componentWillReceiveProps(newProps){

    //If initialValue is defined, do update the state
    this._processFormProps(newProps);
    this.state.selectedValues = this._selectState(this._getIndex(this.initialValue));
  }

  renderChild(){
    let children = [];
    //If props has initialValue, then update selected to that

    for(var i=0;i<this.props.noOfChildren;i++){
      var currentIndex = i;
      var selectedTextStyle = (this._isRadioSelected(i) ?
                              this.mergedStyles.selectedTextStyle :
                                {});
      var selectedContainerStyle = (this._isRadioSelected(i) ?
                                    this.mergedStyles.selectedContainerStyle :
                                    {});
      children.push((
        <View style={[this.mergedStyles.radioContainer,selectedContainerStyle]}
              key={currentIndex}>
        <TouchableWithoutFeedback
            onPress={this._handleClick.bind(this,currentIndex)} >
        <View style={this.mergedStyles.innerRadioContainer}>
          <Text style={[selectedTextStyle,this.mergedStyles.text]}>
          {this.props.btnChoices[currentIndex]}
          </Text>
          </View>
        </TouchableWithoutFeedback>
        </View>
      ));
    }
    return children;
  }



  render(){
    const childComponents = this.renderChild();
    const component = (
      <View style={this.mergedStyles.container} >
      {childComponents}
      </View>
    );
  return super.render(component);
  }
}

const mapStateToProps = (state) => ({
	profile:state.profile,
})

RadioGroup.defaultStyle = {
  container:{
    flex:1,
    flexDirection:'row'
  },
  text:{

  },
  radioContainer:{
    flex:1,
    height:40,
    backgroundColor:'pink',
    marginRight:5
  },
  innerRadioContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  selectedTextStyle:{
    fontWeight: 'bold'
  },
  selectedContainerStyle:{
    backgroundColor: 'red'
  },

}

RadioGroup.defaultProps = {
  color: 'red',
  selectedColor:'blue',
}
RadioGroup.propTypes = {
  noOfChildren: React.PropTypes.number.isRequired,
  btnChoices:React.PropTypes.array.isRequired,
  radioType:React.PropTypes.oneOf(['singleSelect','toggleMultipleSelect']),
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string
}

export default connect(mapStateToProps)(RadioGroup);
