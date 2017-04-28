import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, StatusBar } from 'react-native';
import NavigationRouter from './navigation/NavigationRouter';
import styles from './containers/Styles/RootStyle';

import createStore from './redux/create';

// Strange dirty fix for self becoming undefined
// https://github.com/facebook/react-native/issues/9599
if (typeof global.self === 'undefined') {
  global.self = global;
}

const store = createStore();

export default function createPlatform() {
  const Jenkins = () => (
    <Provider store={store}>
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='light-content'
        />
        <NavigationRouter />
      </View>
    </Provider>
  );

  AppRegistry.registerComponent('jenkins', () => Jenkins);
}


// import React, { PropTypes } from 'react';
// import { View, StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import DebugSettings from './config/DebugSettings';
// import NavigationRouter from './navigation/NavigationRouter';
// import styles from './containers/Styles/RootStyle';
//
// export default class Root extends React.Component {
//   static propTypes = {
//     store: PropTypes.object.isRequired
//   };
//
//   renderApp () {
//     console.log(this.props);
//     console.disableYellowBox = DebugSettings.yellowBox;
//     return (
//       <Provider store={this.props.store}>
//         <View style={styles.applicationView}>
//           <StatusBar
//             barStyle='light-content'
//           />
//           <NavigationRouter />
//         </View>
//       </Provider>
//     );
//   }
//
//   render () {
//     return this.renderApp();
//   }
// }

