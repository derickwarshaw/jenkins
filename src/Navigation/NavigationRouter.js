import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';

// screens identified by the router
import HomeScreen from '../Containers/HomeScreen';
import LoginScreen from '../Containers/LoginScreen';
import JobListScreen from '../Containers/JobListScreen';
import BuildListScreen from '../Containers/BuildListScreen';

/***************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='homeScreen' component={HomeScreen} title='Home' initial />
            <Scene key='login' component={LoginScreen} title='New Instance' />
            <Scene key='jobList' component={JobListScreen} title='Jobs' />
            <Scene key='buildList' component={BuildListScreen} title='Builds' />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
