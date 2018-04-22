import React from 'react';
import Utils from '../schema_engine/Utils';
import {pushNewPage} from './Route';
import ReactJsonSchemaSingleton from '../schema_engine/ReactJsonSchemaSingleton';

class MUIComponent extends React.Component{
  constructor(props,componentStyle,explicitStyle){
    super(props);
    this.mergedStyles = componentStyle;
    if(explicitStyle !== undefined){
      this.mergedStyles = Utils.mergeStyles(componentStyle,explicitStyle);
    }
  }

  componentWillReceiveProps(nextProps:Object){

  }

  //TODO: Merge the two functions
  generateChildren(){
    let layoutName = this.props._layoutName;
    let childrenIds = this.props._childrenIds;
    let idStateMap = this.props._idStateMap;
    let idStateJsonPath = this.props._idStateJsonPath;

    let reactSchema = new ReactJsonSchemaSingleton();
    let children = [];
    let component = null;

    children = reactSchema.generateComponents(childrenIds,layoutName,null,idStateMap,idStateJsonPath);
    // childrenIds.forEach((id)=>{
    //   component = reactSchema.generateComponent(id,layoutName,null,idStateMap,idStateJsonPath);
    //   children.push(component);
    // });

    return children;

  }

  generateChildrenWithCallback(callbacksConf,idStateMap,idStateJsonPath){
    let layoutName = this.props._layoutName;
    let childrenIds = this.props._childrenIds;
    let reactSchema = new ReactJsonSchemaSingleton();
    let children = [];
    let component = null;
    let layout = null;
    let childInitial = null;
    console.log(this.props);
    childrenIds.forEach((id)=>{
      layout = reactSchema.getElement(id,layoutName);
      childInitial = null;
      if((idStateMap !== null) && (idStateMap !== undefined) && (idStateMap.hasOwnProperty(id)) && (idStateJsonPath !== null)){
        childInitial = idStateMap[id];
      }
      component = reactSchema.createComponentFromLayout(layout,layoutName,callbacksConf,childInitial,idStateMap,idStateJsonPath);
      children.push(component);
    });
    return children;

  }

  render(component){

    return component;
  }

}

function onChildSignal(){
  console.log("onStateChildChange")
  console.log(this);
}

export {onChildSignal};
export default MUIComponent;
