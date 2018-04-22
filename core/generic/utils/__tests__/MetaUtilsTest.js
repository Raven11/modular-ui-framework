import MetaUtils from '../MetaUtils';

beforeEach(() => {

});


describe('when handling meta module', () =>{
  it('it correctly calls the function call', () => {

  });
});

describe('when mapping inlets with data', () => {
  let inlets = {'name':'ti1'};
  let data = {'name':'Yash'};
  let result = {'ti1':'Yash'}

  it('correctly returns the map object', () => {
    const actualResult = MetaUtils.mapInletsWithData(inlets,data);
    expect(actualResult).toEqual(result);
  });
});
