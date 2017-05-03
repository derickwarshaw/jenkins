import React, {PropTypes} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles/LoginScreenStyle';
import { login } from '../redux/modules/user';
import {Images, Metrics} from '../themes';
import { Actions as NavigationActions } from 'react-native-router-flux';

class LoginScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      instanceName: '',
      host: '',
      port: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      https: false
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate();
    if (this.isAttempting && !newProps.attempting && newProps.loginSuccess) {
      this.props.close();
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    });
  };

  keyboardDidHide = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    });
  };

  handlePressLogin = () => {
    const { username, password, instanceName, host, port, https } = this.state;
    this.isAttempting = true;
    this.props.login(username, password, instanceName, host, port, https );
  };

  handleChangeUsername = (text) => {
    this.setState({ username: text });
  };

  handleChangePassword = (text) => {
    this.setState({ password: text });
  };

  handleChangeInstanceName = (text) => {
    this.setState({ instanceName: text });
  };

  handleChangeHost = (text) => {
    this.setState({ host: text });
  };

  handleChangePort = (text) => {
    this.setState({ port: text });
  };

  handleChangeHttps = (value) => {
    this.setState({ https: value });
  };

  render () {
    const { username, password, instanceName, host, port, https } = this.state;
    const { attempting } = this.props;
    const editable = !attempting;
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly;
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>InstanceName</Text>
            <TextInput
              ref='instanceName'
              autoCapitalize="none"
              autoCorrect={false}
              style={textInputStyle}
              value={instanceName}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeInstanceName}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.instanceName.focus()}
              placeholder='InstanceName' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Host</Text>
            <TextInput
              ref='host'
              autoCapitalize="none"
              autoCorrect={false}
              style={textInputStyle}
              value={host}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeHost}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.host.focus()}
              placeholder='Host' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Port</Text>
            <TextInput
              ref='port'
              autoCapitalize="none"
              autoCorrect={false}
              style={textInputStyle}
              value={port}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangePort}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.port.focus()}
              placeholder='Port' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Username</Text>
            <TextInput
              ref='username'
              autoCapitalize="none"
              autoCorrect={false}
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='Username' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Password</Text>
            <TextInput
              ref='password'
              autoCapitalize="none"
              autoCorrect={false}
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='Password' />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Https</Text>
            <Switch
              style={Styles.toggle}
              onValueChange={this.handleChangeHttps}
              value={https} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.props.close}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    );
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  attempting: PropTypes.bool,
  close: PropTypes.func,
  login: PropTypes.func,
  loginFail: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    attempting: state.attempting,
    username: state.username,
    jobs: state.data,
    login: state.login,
    loginFail: state.fail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: NavigationActions.pop,
    login: (username, password, instanceName, host, port, https) => dispatch(login(username, password, instanceName, host, port, https))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
