import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Component,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import MUIComponent from '../MUIComponent';

class RadioCircle extends MUIComponent {
  constructor(props){
    super(props,RadioCircle.defaultStyle,props.style);
  }

  render(){
    var { color, isSelected, selectedColor } = this.props;
    let innerCircle;
    let appliedColor;
    if (isSelected) {
     appliedColor = selectedColor;
     innerCircle = <View style={[this.mergedStyles.innerCircle, { backgroundColor: appliedColor }]}/>;
   } else {
     appliedColor = color;
     innerCircle = null;
   }

    const component = (
      <View style={{padding:10}}>
        <View style={[this.mergedStyles.outerCircle, { borderColor: appliedColor }]}>
          {innerCircle}
        </View>
      </View>
    );

    return super.render(component);
  }
}



RadioCircle.defaultStyle = StyleSheet.create({
  outerCircle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2 / window.scale,
    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8
  }
});

RadioCircle.defaultProps = {
  isSelected:false,
}

RadioCircle.propTypes = {
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string,
  isSelected: React.PropTypes.bool
};

export default RadioCircle;
