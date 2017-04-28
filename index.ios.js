import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './src/Root'
import createStore from './src/redux/create'

// Handling store here to avoid hot-reloading issues
const store = createStore();
class RNBase extends React.Component {
  render () {
    return <Root {...this.props} store={store} />
  }
}

AppRegistry.registerComponent('jenkins', () => RNBase);
