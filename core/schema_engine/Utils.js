import React from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';

class Utils{

  /**
   * converts a Json style to a StyleSheet object
   *
   * @param {object} json
   * @return {object} StyleSheet object from json
   */
  static convertJsonToStylesheet(json){
    return StyleSheet.create(json);
  }

  /**
   * Merge two style objects by creating an individual array of styles
   * NOTE The order of style1 and style2 matters.
   * Style2 will be applied on top of style1
   *
   * @param {object} style1 non-null object containing styles
   * @param {object} style2 non-null object containing styles
   * @return {object} containing two style objects that contains array of styles
   */
   static mergeStyles(style1:Object, style2:Object): Object{
     var ret = {};
     for(var keyOne in style1){
        if(Array.isArray(style1[keyOne])){
          ret[keyOne] = style1[keyOne];
        }else{
         ret[keyOne] = [style1[keyOne],];
       }
     }
     for(var keyTwo in style2){
       if(ret.hasOwnProperty(keyTwo)){
         if(Array.isArray(style2[keyTwo])){
          ret[keyTwo].concat(style2[keyTwo]);
         }else{
          ret[keyTwo].push(style2[keyTwo]);
         }
       }else{
         if(Array.isArray(style2[keyTwo])){
          ret[keyTwo] = style2[keyTwo];
         }else{
          ret[keyTwo] = [style2[keyTwo],];
         }
       }
     }
     return ret;
   }

  /**
   * Merge two objects (including prototype inherited properties.
   *
   * @param {object} one Any non-null object.
   * @param {object} two Any non-null object.
   * @return {object} Merging of two objects, including prototype
   * inherited properties
   */
   static mergeObjects(one:Object, two:Object): Object {
     var ret = {};
     for(var keyOne in one){
       ret[keyOne] = one[keyOne];
     }
     for(var keyTwo in two){
       ret[keyTwo] = two[keyTwo];
     }
     return ret;
   }

   /**
    * Get a specified subset of an object
    * @param {object} one Any non-null object;
    * @param {array} one_properties Any non-null array;
    * @return {object} Subset object from the original object
    * that are specified
    */
    static getObjectSubset(one:Object,one_properties:Array){
      var ret = {}
      for(var keyOne in one){
        if(one_properties.indexOf(keyOne) != -1){
          ret[keyOne] = one[keyOne];
        }
      }
      return ret;
    }

    /**
     * Takes in an input object and path and applies the data
     * to the path in the input object
     * @param  {Object} inputObject Any object
     * @param  {String} path        A valid path in the object (use dots to
     *                              represent traversal)
     * @param  {[type]} data        Data to be applied to the inputObject
     * @return {Object}             Output Object that which has the data added
     *                              at that path
     *
     * @example
     * Input: {'a':1,'b':2, 'c':{}}
     * path:  'c.d'
     * data: 'blah'
     * Output: {'a':1,'b':2, 'c':{'d':'blah'}}
     */
    static putObjectIntoPath(inputObject,jsonPath,data){
      let outputObject = _.clone(inputObject);
      let paths = jsonPath.split('.');
      let restPaths;
      if(paths.length === 1){
        outputObject[paths[0]] = data;
      }else{
        restPaths = paths.splice(1,paths.length).join('.');
        if(outputObject.hasOwnProperty(paths[0])){
          outputObject[paths[0]] = Utils.putObjectIntoPath(outputObject[paths[0]],
                                      restPaths,data);
        }else{
          outputObject[paths[0]] = Utils.putObjectIntoPath({},restPaths,data);
        }
      }
      return outputObject;
    }

    /**
     * 
     * For the given inputObject and path, returns the object 
     * 
     * @static
     * @param {any} inputObject
     * @param {any} jsonPath
     * @example 
     * Input: {'a':1,'b':2,'c':{'d':{'1':2,'2':[1,2,3]}}}
     * Path: 'c.d'
     * Output: {'1':2,'2':[1,2,3]}
     * 
     * @memberOf Utils
     */
    static getObjectFromPath(inputObject,jsonPath){
      let outputObject = _.clone(inputObject);
      let paths = jsonPath.split('.');
      let restPaths;
      if(paths.length === 1){
        return outputObject[paths[0]];
      }else{
        restPaths = paths.splice(1,paths.length).join('.');
        if(outputObject.hasOwnProperty(paths[0])){
          return Utils.getObjectFromPath(outputObject[paths[0]],restPaths);
        }
      }
      return null;
    }

    
    /**
     * Returns a single schema object by combining multiple schemas 
     * Some of the rules while combining are:-
     * 1. All layout names are prefixed with the key from schemasObject and then 
     * they are all combined into a single layouts object 
     * 2. All stylesheets are prefixed with the key from schemasObject and then 
     * they are all combined into a single stylesheet object 
     * 3. App configuration is only fetched from root schema  
     * 
     * @ static 
     * @param {Array} schemas
     */
    static combineSchemas(schemas){
      var result = {'layouts':{},'stylesheet':null,'appConfig':null};  
      var schema;
      var newLayouts;
      var newStyleSheet;
      var prefix;
      var seperator = '@';
      
      for(var i=0;i<schemas.length;i++){
        schema = schemas[i];
        if(schema.hasOwnProperty('schemaConfig') && schema.schemaConfig.hasOwnProperty('prefix')){
          prefix = schema.schemaConfig.prefix
        }else{
          throw new Error(`Custom Error: All schemas don't have schemaConfig.prefix defined`);
        }
        newLayouts = Utils.prefixKeysInDictionary(schema.layouts,prefix,seperator);
        
        //Extending result 
        result.layouts = _.extend(result.layouts,newLayouts);
        if(prefix === 'root'){
          result.appConfig = schema.appConfig;
          result.stylesheet = schema.stylesheet;
        }
      }
      return result;

    }


    /**
     * Returns a new dictionary with all keys prefixed with the prefix 
     * 
     * Example input:
     * object = {
     *    'a':1,
     *    'b':2
     *  }
     * prefix = "pre"
     * seperator = "@"
     * 
     * output = {
     *    'pre@a':1.
     *    'pre@b':2
     * }
     * 
     */
    static prefixKeysInDictionary(object,prefix,seperator){
      var output = {};
      for(key in object){
        output[prefix+seperator+key] = object[key];
      }
      return output;
    }

}



export default Utils;
