import React, { PropTypes } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import DebugSettings from './config/DebugSettings';
import NavigationRouter from './navigation/NavigationRouter';
import styles from './containers/Styles/RootStyle';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  renderApp () {
    console.log(this.props);
    console.disableYellowBox = DebugSettings.yellowBox;
    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <NavigationRouter />
        </View>
      </Provider>
    );
  }

  render () {
    return this.renderApp();
  }
}
