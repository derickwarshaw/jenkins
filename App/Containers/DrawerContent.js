import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image } from 'react-native';
import styles from './Styles/DrawerContentStyle';
import { Images } from '../Themes';
import Button from '../Components/Button';
import { Actions as NavigationActions } from 'react-native-router-flux';

class DrawerContent extends Component {

  constructor (props) {
    super(props);

  }

  componentWillReceiveProps (newProps) {
    // Did the logout attempt complete?
    if (this.loginSuccess && !newProps.loginSuccess) {
      this.toggleDrawer();
      NavigationActions.login();
    }
  }

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

  handlePressLogout = () => {
    this.props.attemptLogout();
  };

  render () {
    const userStatus = this.props.loginSuccess ? (
      <Button buttonType="DrawerButton" text='Log Out' onPress={this.handlePressLogout} />
    ) : (
      <Button buttonType="DrawerButton" text='Login' onPress={this.handlePressLogin} />
    );
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        {userStatus}
        <Button buttonType="DrawerButton" text='Home Screen' onPress={this.handlePressHome} />
        <Button buttonType="DrawerButton" text='Jobs' onPress={this.handlePressJobs} />
        <Button buttonType="DrawerButton" text='Device Info' onPress={this.handlePressDevice} />
        <Button buttonType="DrawerButton" text='Build List' onPress={this.handlePressBuildList} />
      </ScrollView>
    );
  }

}

DrawerContent.propTypes = {
  dispatch: PropTypes.func,
  loginSuccess: PropTypes.bool,
  attemptLogout: PropTypes.func
};

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    loginSuccess: state.login.loginSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    attemptLogout: () => dispatch(Actions.attemptLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
