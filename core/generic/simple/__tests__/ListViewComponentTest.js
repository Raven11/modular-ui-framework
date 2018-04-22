import React from 'react';
import ListViewComponent from '../ListViewComponent';
import renderer from 'react-test-renderer';

const props = {
        "noOfChildren":3,
        "btnChoices":["Male","Female","Other"],
        "formProps":{
          "initial":"Male",
        }
};
const lvInst = new ListViewComponent(props);
beforeEach(() => {


});
// describe('while calling _getIndex',() => {
//   it('correctly returns the index if value is present else it returns -1',() => {
//     expect(rnInst._getIndex('Male')).toBe(0);
//     expect(rnInst._getIndex('blah')).toBe(-1);
//   });
// });
