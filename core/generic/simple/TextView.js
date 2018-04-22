import React from 'react';
import {Image,View,Text} from 'react-native';
import Utils from '../../schema_engine/Utils';
import PropTypeUtils from '../../schema_engine/PropTypeUtils';
import MUIComponent from '../MUIComponent';


class TextView extends MUIComponent{
  constructor(props){
    super(props,TextView.defaultStyle,props.style);
  }

  render(){
    const components = (
      <Text style = {this.mergedStyles.text}>
         {this.props.binding}
      </Text>
    );
    return super.render(components);
  }
}


TextView.defaultStyle = {
  flex:1,
}

const reactTextStyleProps = require('TextStylePropTypes');
const subsetStylePropsArray = ['color','fontFamily','fontSize','fontStyle','fontWeight','textAlign'];
const textShapePropType = PropTypeUtils.createShapeTypeCheckerOfSubsetProps(reactTextStyleProps,subsetStylePropsArray);

TextView.propTypes = {
  //style: React.PropTypes.shape({text:textShapePropType}),
  binding: React.PropTypes.string.isRequired,
}
export default TextView;
