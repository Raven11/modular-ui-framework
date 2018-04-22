import React from 'react';
import Utils from './Utils';

const createStrictShapeTypeChecker = require('createStrictShapeTypeChecker');
const layoutPropTypes = require('LayoutPropTypes');


class PropTypeUtils{

  /**
   * creates a react propType shape, given a subset of Properties. It also adds layout Properties by
   * default. The shape created has a strict type checker
   * @param {object} stylePropObject object containing propType properties
   * @param {array} subsetArray array containing subset of properties
   * @return {object} returns a react propType strict shape containing subset propTypes and
   * layout propTypes
   */
  static createShapeTypeCheckerOfSubsetProps(stylePropObject:Object,subsetArray:Array):Object{
    const styleObject = Utils.getObjectSubset(stylePropObject,subsetArray);
    const styleWithLayoutObject = Utils.mergeObjects(layoutPropTypes,styleObject);
    return createStrictShapeTypeChecker(styleWithLayoutObject);
  }

  /**
   * Wrapper to create react propType strict shape
   * @param {object} shapeObject object of react propType shape
   * @return {object} returns a react propType strict shape
   */
  static createStrictShape(shapeObject:Object):Object{
    //TODO Has issues when nesting shapes
    return createStrictShapeTypeChecker(shapeObject);
  }
}


export default PropTypeUtils;
