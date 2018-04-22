import Modules from '../../modular_engine/modules';
import Actions from '../../modular_engine/actions';
import jsonLogic from 'json-logic-js';

class MetaUtils {
  static getInlets(component,moduleType){
    let inlets;
    let props = component.props;
    if(props.hasOwnProperty('meta')){
      if(props.meta.hasOwnProperty(moduleType)){
        inlets = props.meta[moduleType]["inlets"];
        return inlets;
      }
    }
  }
  static handleMetaModule(component,moduleType,extraCallback){
    let _moduleName;
    let _args;
    let props = component.props;

    if(props.hasOwnProperty('meta')){
      if(props.meta.hasOwnProperty(moduleType)){
        _moduleName = props.meta[moduleType]["moduleName"];
        _args = props.meta[moduleType]["args"];
        console.log(_args);
        if(extraCallback !== undefined){
          if(_args === undefined){
            _args = [extraCallback];
          }else{
            _args.push(extraCallback);
          }
        }

        if(Modules.hasOwnProperty(_moduleName)){
            if(_args !== undefined){
              Modules[_moduleName](component,..._args);
            }else{
              Modules[_moduleName](component);
            }
        }
      }
    }
  }

  static returnMetaModuleAction(component,moduleType,extraCallback){
    let _moduleName;
    let _args;
    let props = component.props;
    let result = {functionName:null,args:null};

    if(props.hasOwnProperty('meta')){
      if(props.meta.hasOwnProperty(moduleType)){
        _moduleName = props.meta[moduleType]["moduleName"];
        _args = props.meta[moduleType]["args"];
        console.log(_args);
        if(extraCallback !== undefined){
          if(_args === undefined){
            _args = [extraCallback];
          }else{
            _args.push(extraCallback);
          }
        }

        if(Actions.hasOwnProperty(_moduleName)){
            result['functionName'] = Actions[_moduleName];
            if(_args !== undefined){
              result['args'] = _args;
            }
        }
      }
    }
    return result;
  }


  /**
   * Function that will create a map of component id and it's initial val
   *
   * @param  {Object} inlets Mapping of inlet name & component id (inlet name) is a valid json path
   * @param  {Object} data  Data from server which needs to sent to children components
   * @return {Object} result map of component id and initial values to be sent to them
   *
   * @example
   * inlets = {'name':'ti1'}
   * data = {'name':'Yash'}
   * result = {'ti1':'Yash'}
   */
  static mapInletsWithData(inlets,data){
    let result = {};
    let compId,res;
    for(var jsonRule in inlets){
      compId = inlets[jsonRule];
      res = jsonLogic.apply({"var":jsonRule},data);
      result[compId] = res;
    }
    return result;
  }

  /**
   * processes jsonResult and maps it with inlets of a form
   * @param  {Object} component RN component
   * @param  {Object} jsonResult jsonResult after calling onLoad action
   * @return {Object} childrenStates map of children id and it's state
   */
  static processFormOnLoadMeta(component,jsonResult){
    let inlets = MetaUtils.getInlets(component,'onLoad');
    return  MetaUtils.mapInletsWithData(inlets,jsonResult);
  }

}
export default MetaUtils;
