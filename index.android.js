import { AppRegistry } from 'react-native';
import App from './core/App'
import codePush from "react-native-code-push";



// let codePushOptions = { checkFrequency: codePush.CheckFrequency.IMMEDIATE,updateDialog: true}
// App = codePush(codePushOptions)(App);
AppRegistry.registerComponent('json2app', () => App);
