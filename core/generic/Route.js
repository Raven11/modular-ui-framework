import React from 'react';
import { NavigationExperimental,
        StyleSheet,
        PixelRatio,
        View,
        TouchableHighlight,
        Text,
        BackAndroid,
        Platform
      } from 'react-native';
import EventsSingleton from '../schema_engine/EventsSingleton';
import {eventsList} from '../schema_engine/constants';
import NavigationUtils from './utils/NavigationUtils';
import ReactJsonSchemaSingleton from '../schema_engine/ReactJsonSchemaSingleton';
import ComponentUtils from './utils/ComponentUtils';


const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

//TODO: Remove this and use Button instead
class TappableRow extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={this.props.style}
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

class Route extends React.Component{
  constructor(props,context){
    super(props,context);
    console.log("constructor");


    let routeKey = NavigationUtils.getRouteKey(this.props.layout);
    this.state = {
      // This defines the initial navigation state.
      navigationState: {
        index: 0, // Starts with first route focused.
        routes: [{key: routeKey}], // Starts with only one route.
      },
      overrideLayout:null,
    };

    this._onNavigationChange = this._onNavigationChange.bind(this);
    this.pushNewPage = this.pushNewPage.bind(this);
    this.popPage = this.popPage.bind(this);
    this.popToPage = this.popToPage.bind(this);
    this.popToPageWithNewLayout = this.popToPageWithNewLayout.bind(this);
    this._onPushRoute = this._onNavigationChange.bind(null, 'push');
    this._onPopRoute = this._onNavigationChange.bind(null, 'pop');
    this._renderScene = this._renderScene.bind(this);


    this._backButtonListener = null;
    //TODO: Make it a initialization list and process these event in the base constructor
    var events = EventsSingleton.getInstance();
    events.subscribeEvent(eventsList['pushNewPage'],this.pushNewPage);
    events.subscribeEvent(eventsList['popToPage'],this.popToPage);
    events.subscribeEvent(eventsList['popToPageWithNewLayout'],this.popToPageWithNewLayout);
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
    if (Platform.OS === "android" && this._backButtonListener === null) {
      this._backButtonListener = BackAndroid.addEventListener("hardwareBackPress", this._shouldItTakeToPrevPage);
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log("shouldComponentUpdate");
    return true;
  }

  componentDidUpdate(prevProps,prevState){
    console.log("componentDidUpdate");
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
  }

  _shouldItTakeToPrevPage = () => {
    if (this.state.navigationState.routes.length > 1) {
      this.popPage();
      return true;
    }
    BackAndroid.exitApp();
    return false;
  }


  _onNavigationChange(type){
    switch(type){
      case 'push':
        this.pushNewPage();
        break;
      case 'pop':
        // Pop the current route using the pop reducer.
        this.popPage();
        break;
    }
  }


  _updateState = (state) => {
      this.setState(state);
  }

  popPage(data){
    let {navigationState} = this.state;
    navigationState = NavigationUtils.popPage(navigationState);
    this._updateState({navigationState:navigationState,overrideLayout:null});
  }

  popToPage(layout){
    let {navigationState} = this.state;
    navigationState = NavigationUtils.popToPage(layout.layout,navigationState);
    this._updateState({navigationState:navigationState,overrideLayout:null});
  }

  popToPageWithNewLayout(layout,new_layout){
    let {navigationState} = this.state;
    navigationState = NavigationUtils.popToPage(layout.layout,navigationState);
    this._updateState({navigationState:navigationState,overrideLayout:layout});
  }


  pushNewPage(layout) {
    let {navigationState} = this.state;
    navigationState = NavigationUtils.pushNewPage(layout.layout,navigationState);
    this._updateState({navigationState:navigationState,overrideLayout:null});
  }


  _shouldShowBackButton = () => {
    if(this.state.navigationState.routes.length <= 1){
      return false;
    }
    return true;
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  // Here you could choose to render a different component for each route, but
  // we'll keep it simple.
  _renderScene(sceneProps) {
    console.log('renderScene');
    let layoutName = NavigationUtils.getLayoutNameFromKey(sceneProps.scene.key);
    let reactSchema = new ReactJsonSchemaSingleton();
    let component = reactSchema.createComponent(null,layoutName);

    if((this.state.overrideLayout !== null)&& (this.state.overrideLayout !== undefined)){
        if(layoutName === this.state.overrideLayout.layout){
          let newLayout = this.state.overrideLayout.new_layout;
          component = reactSchema.createComponent(null,newLayout);
        }
    }

    let finalComponents = null;
    var ProgressBar = require('ProgressBarAndroid');
    var backButtonComponent = null;

    if(this._shouldShowBackButton()){
      backButtonComponent = (<TappableRow
        text="Back"
        style={styles.backButton}
        onPress={this._onPopRoute}
      />);
    }

    if(ComponentUtils.getShowStatusBarProp(component)){
      finalComponents = (
        <View style={{flex:1}}>
        <View style={styles.row}>
          {backButtonComponent}
          <Text style={styles.titleText}>
            {component.props.title}
          </Text>
        </View>
        {component}
        </View>

      );
    }else{
      finalComponents = component;
    }


    return finalComponents;
  }

  render(){
    console.log('render');
    return (
      <NavigationCardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.state.navigationState}
        renderScene={this._renderScene}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom:15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
    alignItems:'stretch',
  },
  backButton:{
    width:40,
    height:20,
  },
  titleText:{
    fontSize:17,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 17,
    textAlign:'center'
  },
});

Route.defaultProps = {

}

export default Route;
