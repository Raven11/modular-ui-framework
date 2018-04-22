// @flow
class ComponentUtils {

  /**
   * Extracts showAppBar property from component
   * Defaults to true
   */
  static getShowStatusBarProp(component){
    if(component.props.hasOwnProperty('showStatusBar')){
      return component.props['showStatusBar'];
    }
    return true;
  }
}


export default ComponentUtils;
