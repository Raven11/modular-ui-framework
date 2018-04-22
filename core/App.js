import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import ReducerRegistry from './store/ReducerRegistry'
import coreReducers from './reducers'
import appReducers from '../app/reducers'
import RootContainer from './RootContainer'

let reducerRegistry = new ReducerRegistry(coreReducers)
let store = configureStore(reducerRegistry)
reducerRegistry.register(appReducers)

class App extends Component {
	render() {
	    return (
	      <Provider store={store}>
	        <RootContainer />
	      </Provider>
	    );
  	}
}

export default App;
