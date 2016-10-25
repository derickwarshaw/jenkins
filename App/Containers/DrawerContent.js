import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import styles from './Styles/DrawerContentStyle';
import { Images } from '../Themes';
import Button from '../Components/Button';
import { Actions as NavigationActions } from 'react-native-router-flux';

class DrawerContent extends Component {

  toggleDrawer () {
    this.context.drawer.toggle();
  }

  handlePressHome = () => {
    this.toggleDrawer();
    NavigationActions.homeScreen();
  };

  handlePressJobs = () => {
    this.toggleDrawer();
    NavigationActions.jobList();
  };

  handlePressDevice = () => {
    this.toggleDrawer();
    NavigationActions.deviceInfo();
  };

  handlePressLogin = () => {
    this.toggleDrawer();
    NavigationActions.login();
  };

  handlePressBuildList = () => {
    this.toggleDrawer();
    NavigationActions.buildList();
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <Button buttonType="DrawerButton" text='Home Screen' onPress={this.handlePressHome} />
        <Button buttonType="DrawerButton" text='Jobs' onPress={this.handlePressJobs} />
        <Button buttonType="DrawerButton" text='Device Info' onPress={this.handlePressDevice} />
        <Button buttonType="DrawerButton" text='Login' onPress={this.handlePressLogin} />
        <Button buttonType="DrawerButton" text='Build List' onPress={this.handlePressBuildList} />
      </ScrollView>
    );
  }

}

DrawerContent.propTypes = {
};

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
};

export default DrawerContent;
