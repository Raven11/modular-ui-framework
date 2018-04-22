import NavigationUtils from '../NavigationUtils';

const navState = {
    index: 0,
    routes: [{key: 'layout1'}],
}
const navState2 = {
  index: 0,
  routes:[{key: 'layout1'},{key: 'layout2'},{key: 'layout3'}]
}
beforeEach(() =>{


});

describe('when pushing a new page', () =>{
  it('adds a new route', () => {
    expect(navState.routes.length).toBe(1);
    let result = NavigationUtils.pushNewPage('layout2',navState);
    expect(result.routes.length).toBe(2);
  });
});

describe('when popping all pages till a particular page', () =>{
  it('removes all state till it finds the layout', () =>{
    expect(navState2.routes.length).toBe(3);
    let result = NavigationUtils.popToPage('layout2',navState2);
    expect(result.routes.length).toBe(2);
    let result2 = NavigationUtils.popToPage('layout1',navState2);
    expect(result2.routes.length).toBe(1);
  });
});
