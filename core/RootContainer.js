import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet } from 'react-native'
import * as schemaActions from './actions/schema'
import * as contextActions from './actions/context'

class RootContainer extends Component {

  componentDidMount = () => {
		this.props.actions.context.loadContext()
 		this.props.actions.schema.loadSchema()
  }

  render() {
    return (
    <View style={{flex:1}}>
      {this.props.rootView}
    </View>
  )
  }

}

export default connect(
	(state) => ({
		appSchema: state.schema.schema.appSchema,
		rootView: state.schema.schema.rootView
	}),
	(dispatch) => ({
		actions: {
			schema: bindActionCreators(schemaActions, dispatch),
			context: bindActionCreators(contextActions, dispatch)
		}
	})
)(RootContainer)
