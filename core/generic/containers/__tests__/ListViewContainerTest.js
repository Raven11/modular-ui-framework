import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import ListViewContainer from '../ListViewContainer';
import {shallow} from 'enzyme';

const middlewares = []
const mockStore = configureStore(middlewares)
const props = {
    "id":"lv1",
    "component":"ListViewContainer",
    "rowDefaultLayout":"layoutListRow",
    "dataSource":['row 1', 'data 2'],
}
let component;

beforeEach(() => {

});

describe('<ListViewContainer/>',() => {
 it('should update this.dataSource correctly from the configuration', () => {
   // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);
  const component = React.createElement(ListViewContainer, {...props,store:store},null);
  console.log(component);
//   expect(component.hasOwnProperty('dataSource')).toBe(true);

});
});