import React from 'react';
import _ from 'lodash';
import Utils from './Utils';
import Route from '../generic/Route';
import {onChildSignal} from '../generic/MUIComponent';


const PROPERTY_STYLE = "style"
const PROPERTY_STYLE_CLASS = "styleClass"

var _componentMap = null;
var _stylesheet = null;
var _routeStacks = null;
var _layouts = null;
var _componentMandatoryProperties = ['component','id'];
var instance = null;

var _currentElementId = null;


class ReactJsonSchemaSingleton{

  constructor(){
    if(!instance){
      instance = this;
    }
  }

  /**
   * Creates a Route component from a rootStack configuration
   * @param  {Object} rootStack rootStack configuration
   * @return {Component} RN Component
   *
   * @example
   * rootStack: {
   *             "startPage":"layout1",
   *            }
   *
   */
  parseRouteStack(rootStack){
    if(rootStack.hasOwnProperty('startPage')){
     let startPage = rootStack.startPage;
     if(_layouts.hasOwnProperty(startPage)){
       let props = {
         layout:rootStack.startPage
       };
       let reactElement = React.createElement(Route,props,null);
       return reactElement;
     }else{
       throw new Error(`Custom Error: Layout ${startPage} is not defined`);
     }
   }
   throw new Error(`Custom Error: Layout property startPage is not defined`);
  }


  // /**
  //  * [parseSchema description]
  //  * @param  {[type]} schema [description]
  //  * @return {[type]}        [description]
  //  */
  // parseSchema(schema){
  //   let element = null;
  //   let elements = null;
  //   if(Array.isArray(schema)){
  //     elements = this.parseSubSchemas(schema);
  //   } else{
  //     element = this.createComponent(schema);
  //   }
  //
  //   return element || elements;
  // }
  //
  //
  // parseSubSchemas(subSchemas = []){
  //   let index = 0;
  //   const components = [];
  //   _.forEach(subSchemas, (subSchema, index) =>{
  //      subSchema.key = index;
  //      components.push(this.parseSchema(subSchema));
  //   });
  //   return components;
  // }
  //
  //
  // /**
  //  * Returns a RN element from the schema provided
  //  * @param  {Object} schema properties of this component
  //  * @return {Component}        RN Component
  //  */
  // createComponent(schema){
  //   if (this.validateComponentProperties(schema)) {
  //     let props = _.clone(schema);
  //     props = _.omit(props, ['component','children']);
  //     this.concatStyles(props);
  //     if(!(_componentMap.hasOwnProperty(schema.component))){
  //        throw new Error(`Custom Error: Component ${schema.component} is not defined`);
  //     }
  //     const Component = _componentMap[schema.component];
  //     const Children = (schema.hasOwnProperty('children') &&
  //                     _.isArray(schema.children) &&
  //                     schema.children.length) ? this.parseSchema(schema.children) : null;
  //     return React.createElement(Component,props,Children);
  //
  //     // props['subComponents'] = schema.children;
  //     // console.log(schema.children);
  //     // return React.createElement(Component,props,null);
  //   }else{
  //     throw new Error(`Custom Error: Component $(schema.component) doesn't have all the compulsory properties`);
  //   }
  //
  // }

  getComponentMap(){
    return _componentMap;
  }

  getComponentCompulsoryProperties(){
    return _componentMandatoryProperties;
  }

  setComponentMap(componentMap){
    _componentMap = componentMap;
  }


  getLayouts(){
    return _layouts;
  }

  setLayouts(layouts){
    _layouts = layouts;
  }

  setRouteStacks(routeStacks){
    _routeStacks = routeStacks;
  }

  getStylesheet(){
    return _stylesheet;
  }

  setStylesheet(stylesheet){
    _stylesheet = stylesheet;
  }

  validateComponentProperties(component){
    var validComponent = true;
    _componentMandatoryProperties.forEach((property) => {
        if(!component.hasOwnProperty(property)){
          validComponent = false;
        }
    });
    return validComponent;
  }


  /**
   * If both styleshet and inline style is defined. Apply stylesheet first,
   * followed by inline style i.e Inline style will override stylesheet.
   */
  concatStyles(component){
    const styleSheetStyles = {};
    //Extract individual styles from stylesheet
    if(component.hasOwnProperty(PROPERTY_STYLE_CLASS)){
      for(var sectionName in component[PROPERTY_STYLE_CLASS]){
        const styleClass = component[PROPERTY_STYLE_CLASS][sectionName]
        if(_stylesheet.hasOwnProperty(styleClass)){
          styleSheetStyles[sectionName] = _stylesheet[styleClass];
        }
      }
    }

    //Merge styles
    if(component.hasOwnProperty(PROPERTY_STYLE) && component.hasOwnProperty(PROPERTY_STYLE_CLASS)){
      const componentStyle = component[PROPERTY_STYLE];
      component[PROPERTY_STYLE] = Utils.mergeStyles(styleSheetStyles,componentStyle);
      return;
    }

    //only stylesheet class
    if(!component.hasOwnProperty(PROPERTY_STYLE) && component.hasOwnProperty(PROPERTY_STYLE_CLASS)){
      component[PROPERTY_STYLE] = styleSheetStyles;
      return;
    }

  }

  getElement(elementId:String,layoutName:String){
    if(_layouts.hasOwnProperty(layoutName)){
       const layout = _layouts[layoutName];
       const result = this.getElementFromLayout(elementId,layout);
      return result;
    }else{
      throw new Error(`Custome Error:Layout ${layoutName} is not defined`);
    }
   
  }

  getElementFromLayout(elementId=null,topComponent:Object): Object{
    if((topComponent.id === elementId)||(!elementId)){
      return topComponent;
    }

    if(topComponent.hasOwnProperty('children')){
      let result = null;
      for(var i in topComponent.children){
        let _result = this.getElementFromLayout(elementId,topComponent.children[i]);

        //TODO: Read about undefined & Null. I spent half an hour debugging an issue with this
        if((_result !== undefined) && (_result !== null)){
          result = _result;
        }
      }
      return result;
    }
  }

  getChildrenElements(elementId:Object,layoutName:Object):Array{
      const element = this.getElement(elementId,layoutName);
      if(element.hasOwnProperty('children')){
        return element.children;
      }
      return [];
  }

  /**
   * Returns a RN Object from the Layout
   * @param  {Object} layout              Layout object from JSON
   * @param  {String} layoutName          Name of the layout
   * @param  {[type]} updateStateCallback [description]
   * @param  {[type]} childInitial        [description] 
   * @param  {[type]} idStateJsonPath     [description] 
   * @return {React.component}            Returns a RN component
   */
  createComponentFromLayout(layout,layoutName,updateStateCallback,childInitial,idStateMap,idStateJsonPath){
    if (this.validateComponentProperties(layout)) {
      let props = _.clone(layout);
      props = _.omit(props, ['component','children']);
      props['_layoutName'] = layoutName;
      props['_childrenIds'] = [];
      props['_idStateMap'] = idStateMap;
      props['_idStateJsonPath'] = idStateJsonPath;
      props['key'] = props.id;


      if((updateStateCallback !== null) && (updateStateCallback != undefined)){
        props['_updateStateCallback'] = updateStateCallback;
      }

      if((childInitial !== undefined) && (childInitial !== null) && (idStateJsonPath !== undefined) 
                   && (idStateJsonPath !== null)){
        //Inserts childInitial in the given path

        props = Utils.putObjectIntoPath(props,idStateJsonPath,childInitial);
      }


      this.concatStyles(props);
      //TODO Removve this and move it to validateComponentProperties
      if(!(_componentMap.hasOwnProperty(layout.component))){
         throw new Error(`Custom Error: Component ${layout.component} is not defined`);
      }
      const Component = _componentMap[layout.component];

      if(layout.hasOwnProperty('children')){
        layout.children.forEach((child)=>{
          if(this.validateComponentProperties(child)){
            props['_childrenIds'].push(child.id);
          }
          else{
            throw new Error(`Custom Error: Component $(child.component) doesn't have all the compulsory properties`);
          }
        })
      }

      return React.createElement(Component,props,null);
    }else{
      throw new Error(`Custom Error: Component $(layout.component) doesn't have all the compulsory properties`);
    }
  }


  /**
   * Creates a RN Component, given elementId & layout Name
   * @param  {String} elementId  id of a given component represented by 'id'
   * @param  {String} layoutName Name of the layout provided in json
   * @return {React.Component} RN Component
   */
  createComponent(elementId:String,layoutName:Object){
    const layout = this.getElement(elementId,layoutName);
    return this.createComponentFromLayout(layout,layoutName);
  }

  generateComponent(componentId,layoutName,callbacksConf,idStateMap,idStateJsonPath){
    layout = this.getElement(componentId,layoutName);
    componentId = layout.id;
    childInitial = null;
    if((idStateMap !== null) && (idStateMap !== undefined) && (idStateMap.hasOwnProperty(componentId)) && (idStateJsonPath !== null)){
        childInitial = idStateMap[componentId];
    }
    component = this.createComponentFromLayout(layout,layoutName,callbacksConf,childInitial,idStateMap,idStateJsonPath);
    return component;
  }


   generateComponents(componentIds,layoutName,callbacksConf,idStateMap,idStateJsonPath){
     let children = [];
     componentIds.forEach((id)=>{
      component = this.generateComponent(id,layoutName,callbacksConf,idStateMap,idStateJsonPath);
      children.push(component);
    });
    return children;
  }


}



export default ReactJsonSchemaSingleton;
