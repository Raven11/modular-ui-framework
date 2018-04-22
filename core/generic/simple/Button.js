import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import PropTypeUtils from '../../schema_engine/PropTypeUtils';
import MUIFormChildComponent from '../MUIFormChildComponent';
import Modules from '../../modular_engine/modules';

class Button extends MUIFormChildComponent{
  constructor(props){
    super(props,Button.defaultStyle,props.style);
  }
  _handleClick(){
    const moduleName = this.props.meta.onClickModule.moduleName;
    const args = this.props.meta.onClickModule.args;
    const next = this.props.meta.onClickModule.next;
    if(Modules.hasOwnProperty(moduleName)){
        if(args !== undefined){
          Modules[moduleName](this,...args);
        }else{
          Modules[moduleName](this);
        }
    }

    this._updateStateToParentForm(this.props.signal);

    // console.log(returnedContent);
    // if(next != 'undefined'){
    //   if(Modules.hasOwnProperty(next)){
    //     if(returnedContent != 'undefined'){
    //       Modules[next](...args);
    //     }else{
    //       Modules[next]();
    //     }
    //   }
    // }
  }
  render(){
    let children = this.generateChildren();
    const components = (
      <TouchableOpacity onPress={() => this._handleClick()}
      testID={this.props.id}
      style={this.mergedStyles.outerContainer}
      >
      <View style={{flex:1,flexDirection:'row',justifyContent: 'center','alignItems':'center'}}>
        {children}
      </View>
      </TouchableOpacity>
    );
    return super.render(components);
  }
}

Button.defaultStyle = {
  outerContainer:{
    height:45,
    overflow:'hidden',
    backgroundColor: 'red',
  },
}


//const containerShapePropType = PropTypeUtils.createShapeTypeCheckerOfSubsetProps({},[]);

//
// const _shapePropType = {text: React.PropTypes.shape({text:shapePropType})};
// const shapePropType = PropTypeUtils.createStrictShape(_shapePropType);

Button.propTypes = {
  id:React.PropTypes.string.isRequired,
  // children:React.PropTypes.array.isRequired,
  // meta:React.PropTypes.shape({
  //   onClickModule:React.PropTypes.shape({
  //     moduleName:React.PropTypes.string.isRequired,
  //   })
  // }).isRequired,
  // style:React.PropTypes.shape({outerContainer:containerShapePropType}),
}

export default Button;
