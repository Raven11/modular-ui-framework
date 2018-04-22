import {NavigationExperimental} from 'react-native';
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

class NavigationUtils {

  static getRouteKey(layout){
    return layout;
  }

  static getLayoutNameFromKey(key){
     //Assuming key is created as scene_layout
     // scene_ is prepended by React Native
     return key.split('_')[1];
  }

  static pushNewPage(layoutName,navigationState){
    let routeKey = this.getRouteKey(layoutName);

    // Push a new route, which in our case is an object with a key value.
    // I am fond of cryptic keys (but seriously, keys should be unique)
    const route = {key: routeKey};

    // Use the push reducer provided by NavigationStateUtils
    navigationState = NavigationStateUtils.push(navigationState, route);
    return navigationState;
  }

  static popPage(navigationState){
    navigationState = NavigationStateUtils.pop(navigationState);
    return navigationState;
  }

  static popToPage(layoutName,navigationState){
    let index = NavigationStateUtils.indexOf(navigationState,layoutName);
    const routes = navigationState.routes.slice(0,index+1);
    navigationState = {...navigationState,index:index,routes};
    return navigationState;
  }

}

export default NavigationUtils;
