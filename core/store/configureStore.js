import {applyMiddleware, createStore, compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';

import configureReducers from './configureReducers'
import rootActions from '../actions'
import { createTracker } from './middlewares/analytics/segment'
import appActions from '../../app/actions'

const composeEnhancers = composeWithDevTools({
    rootActions,
    appActions
});
// Creating segment tracker with writekey
const tracker = createTracker('sNKkNr2jZ1LaMbOuNpvJQbeq20fb85vm');
const logger = createLogger();

//// let createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunkMiddleware)(createStore))

module.exports = function configureStore(reducerRegistry) {
  let rootReducer = configureReducers(reducerRegistry.getReducers())

  let store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(invariant(), thunkMiddleware, tracker, logger)));
  ////let store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  })


  return store
}
