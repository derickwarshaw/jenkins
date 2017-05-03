import React, {PropTypes} from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../themes';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Button from '../components/Button';

// Styles
import styles from './Styles/PresentationScreenStyle';

class HomeScreen extends React.Component {

  static propTypes = {
    login: PropTypes.func,
    username: PropTypes.string,
    instanceName: PropTypes.string,
    host: PropTypes.string,
    jobList: PropTypes.func,
    port: PropTypes.string,
    path: PropTypes.string

  };

  render () {
    const instanceName = this.props.instanceName;
    const addInstanceButton = !instanceName ? (
      <Button buttonType="RoundedButton" onPress={this.props.login}>
        Log In
      </Button>
    ) : null;

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Your Jenkins Instances
            </Text>
            <View>
              <Text style={styles.sectionText} onPress={this.props.jobList} >
                {instanceName}
              </Text>
            </View>
          </View>
          {addInstanceButton}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    username: state.username,
    instanceName: state.instanceName,
    host: state.host,
    port: state.port,
    path: state.path
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: NavigationActions.login,
    jobList: NavigationActions.jobList
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
