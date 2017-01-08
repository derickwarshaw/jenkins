import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Image } from 'react-native';
import styles from './Styles/DrawerContentStyle';
import { Images } from '../Themes';
import Button from '../Components/Button';
import Actions from '../Actions/Creators';
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

  handlePressLogin = () => {
    this.toggleDrawer();
    NavigationActions.login();
  };

  handlePressLogout = () => {
    this.props.logoutAttempt();
    this.toggleDrawer();
    NavigationActions.homeScreen();
  };

  render () {
    const userStatus = this.props.loginSuccess ? (
      <Button buttonType="DrawerButton" text='Log Out' onPress={this.handlePressLogout} />
    ) : (
      <Button buttonType="DrawerButton" text='Login' onPress={this.handlePressLogin} />
    );

    const jobListContent = this.props.jobList.length ? (
      <Button buttonType="DrawerButton" text='Jobs' onPress={this.handlePressJobs} />
    ) : null;

    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        {userStatus}
        <Button buttonType="DrawerButton" text='Home Screen' onPress={this.handlePressHome} />
        {jobListContent}
      </ScrollView>
    );
  }

}

DrawerContent.propTypes = {
  buildList: PropTypes.array,
  dispatch: PropTypes.func,
  jobList: PropTypes.array,
  loginSuccess: PropTypes.bool,
  logoutAttempt: PropTypes.func
};

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.login.loginSuccess,
    buildList: state.builds.data,
    jobList: state.jobs.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    logoutAttempt: () => dispatch(Actions.logoutAttempt())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
