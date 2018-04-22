import React from 'react';
import {Image,View,Text} from 'react-native';
import MUIComponent from '../MUIComponent';

class GenericComponent extends MUIComponent{
  constructor(props){
    super(props,GenericComponent.defaultStyle,props.style);
  }

  render(){
    let children = this.generateChildren();
    const component = (
      <View style={this.mergedStyles.container}>
        {children}
      </View>
    );
    return super.render(component);
  }
}

GenericComponent.defaultStyle = {

}

GenericComponent.propTypes = {

};

export default GenericComponent;
