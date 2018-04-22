import React from 'react';
import {Image,View} from 'react-native';
import MUIComponent from '../MUIComponent';


class ImageView extends MUIComponent{
  constructor(props){
    super(props,ImageView.defaultStyle);
  }

  render(){
    const components = (
      <Image
          style={this.mergedStyles.image}
          source={this.props.source}
      />
    );
    return super.render(components);
  }
}

ImageView.defaultStyle = {
  image:{

  }
}
ImageView.propTypes = {
   source: React.PropTypes.shape({
     uri:React.PropTypes.string.isRequired
   }).isRequired,
}
export default ImageView;
