import {
        Alert,
        NetInfo,
        } from 'react-native';
import ReactJsonSchemaSingleton from '../schema_engine/ReactJsonSchemaSingleton';
import EventsSingleton from '../schema_engine/EventsSingleton';
import {eventsList} from '../schema_engine/constants';

class Modules {
  static showAlertDialog(component,title='Alert',description='Default message'){
    Alert.alert(
      title,
      description,
      // [
      //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      // ]
    )
  }

  static makePOSTRequest(component,url,data,callback){

    try{
      return fetch(url, {
        method: 'POST',
        body: data
      }).then((response) => {
        console.log(response);
        console.log(response.json());
        response.json()
      })
        .then((responseJson) => {
          callback(responseJson);
        });
    } catch(error) {
      callback(error);
      return error;
    }
  }

  /**
   * Module that makes a GET request
   * @param  {Object}   component RN Component
   * @param  {String}   url       Url for the GET request
   * @param  {Function} callback  Callback to be invoked after success/failure operation
   */
  static makeGETRequest(component,url,callback){
    try{
       fetch(url).then((response) => response.json())
        .then((responseJson) => {
          if(callback !== undefined){
            callback(responseJson);
          }
        });
    } catch(error) {
      if(callback !== undefined){
        callback(error);
      }
    }
  }

  static pushNewPage(component,layout_name){
    const reactJsonSchema = new ReactJsonSchemaSingleton();
    if(reactJsonSchema.getLayouts().hasOwnProperty(layout_name)){
       var events = EventsSingleton.getInstance();
       events.dispatchEvent(eventsList['pushNewPage'],{layout:layout_name})
    }else{
      throw new Error(`Custom Error: Layout $(layout_name) is not defined`);
    }
  }

  static scanBarcode(component, moduleName,data){
    console.log(moduleName);
    console.log(data);
    if(Modules.hasOwnProperty(moduleName)){
        Modules[moduleName](component,data);
    }
  }

  static popToPage(component,layout_name,data){
    const reactJsonSchema = new ReactJsonSchemaSingleton();
    if(reactJsonSchema.getLayouts().hasOwnProperty(layout_name)){
       var events = EventsSingleton.getInstance();
       events.dispatchEvent(eventsList['popToPage'],{layout:layout_name,data:data})
    }else{
      throw new Error(`Custom Error: Layout $(layout_name) is not defined`);
    }
  }

  static popToPageWithNewLayout(component, layout_name, new_layout_name){
    const reactJsonSchema = new ReactJsonSchemaSingleton();
    const layouts = reactJsonSchema.getLayouts();
    if(layouts.hasOwnProperty(layout_name)){
      if(layouts.hasOwnProperty(new_layout_name)){
       var events = EventsSingleton.getInstance();
       events.dispatchEvent(eventsList['popToPageWithNewLayout'],{layout:layout_name,new_layout:new_layout_name})
     }else{
       throw new Error(`Custom Error: Layout $(new_layout_name) is not defined`);
     }
    }else{
      throw new Error(`Custom Error: Layout $(layout_name) is not defined`);
    }
  }


  /**
   *
   */
   static showFormAlertDialog(component){
     var str = "";
     for(var stateName in component.state.childrenState){
       console.log(stateName);
       console.log(component.state.childrenState[stateName]);
       str = str + stateName + ":" + component.state.childrenState[stateName] + "\n";
     }
     console.log(str);

     Modules.showAlertDialog(component,'Alert',str);
   }


  /**
   * Module specifically for barcode scanning
   * 1. popToLayout
   * 2. validate data & throw error message if invalid
   * 3. throw error popUp if internet is not there
   * 4. call backend API & throw success message
   **/
   static barcodeScanning_scanProcess(component,data,layout,url){
    console.log(url);
    Modules.popToPage(component,layout,data);
    if(data.length <= 20){
        Modules.showAlertDialog('Alert','QR Code is not scanned properly');
        return;
    }
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      if(!isConnected){
        Modules.showAlertDialog(component,'Alert','Mobile phone is offline');
      }
      else{
         Modules.makePOSTRequest(component,url,data,Modules.barcodeScanning_showOutputDialog);
      }
    });
   }

   static barcodeScanning_showOutputDialog(result){
     console.log(result);
     Modules.showAlertDialog(null,'Alert',result.Message);
   }





}

export default Modules;
