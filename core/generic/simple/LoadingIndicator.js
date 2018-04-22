import React from 'react';
import {
  ActivityIndicator,
  View,
  Modal
} from 'react-native';
import MUIComponent from '../MUIComponent';

class LoadingIndicator extends MUIComponent {
  constructor(props){
    super(props,LoadingIndicator.defaultStyle);
    this.state = {
      animating: true,
      modalVisible:true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    return (

      <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={this.mergedStyles.container}>
            <View style={this.mergedStyles.overlay}>
            <ActivityIndicator
              animating={this.state.animating}
              style={this.mergedStyles.component}
              size={this.props.size}
              />
              </View>
            </View>
        </Modal>

    );
  }
}
LoadingIndicator.defaultStyle = {
  component:{
    flex:1
  },
  container:{
    flex: 1,
  },
  overlay:{
    flex:1,
    backgroundColor: '#00000077'
  }
}
LoadingIndicator.defaultProps = {
  size:"large",
}
LoadingIndicator.propTypes = {
  size:React.PropTypes.string
}
export default LoadingIndicator;
