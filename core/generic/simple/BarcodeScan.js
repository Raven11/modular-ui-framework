import MUIComponent from '../MUIComponent';
import React from 'react';
import {StyleSheet,
        Platform,
        Vibration,
        View,
        Text} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import Modules from '../../modular_engine/modules';

class BarcodeScan extends MUIComponent {
  constructor(props){
    super(props,BarcodeScan.defaultStyle,props.style);
    this.state = {
      barcode: '',
      cameraType: 'back',
      torchMode: 'on',
      type: 'QR_CODE',
    };
  }

  _handleBarcodeRead(e) {
    console.log('handleBarcodeRead');
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    const moduleName = this.props.meta.onScanBarcodeModule.moduleName;
    const args = this.props.meta.onScanBarcodeModule.args;
    const next = this.props.meta.onScanBarcodeModule.next;
    if(Modules.hasOwnProperty(moduleName)){
        if(args !== undefined){
          Modules[moduleName](this,e.data,...args);
        }else{
          Modules[moduleName](this,e.data);
        }
    }

  }

  render(){
    let scanArea = null;
  //   if (Platform.OS === 'ios') {
  //   scanArea = (
  //     <View style={this.mergedStyles.rectangleContainer}>
  //       <View style={this.mergedStyles.rectangle} />
  //     </View>
  //   )
  // }


  const components = (
        <BarcodeScanner
          onBarCodeRead={this._handleBarcodeRead.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
  );
  return super.render(components);
  }
}

BarcodeScan.defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});

export default BarcodeScan;
