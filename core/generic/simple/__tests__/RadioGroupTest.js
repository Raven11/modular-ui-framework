import React from 'react';
import RadioGroup from '../RadioGroup';
import renderer from 'react-test-renderer';

const props = {
        "noOfChildren":3,
        "btnChoices":["Male","Female","Other"],
        "formProps":{
          "initial":"Male",
        }
};
const rnInst = new RadioGroup(props);
beforeEach(() => {


});
describe('while calling _getIndex',() => {
  it('correctly returns the index if value is present else it returns -1',() => {
    expect(rnInst._getIndex('Male')).toBe(0);
    expect(rnInst._getIndex('blah')).toBe(-1);
  });
});
