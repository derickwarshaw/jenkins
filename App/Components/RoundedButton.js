import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/RoundedButtonStyle';

const RoundedButton = (props) => {

  const getText = () => {
    const buttonText = props.text || props.children.toString();
    return buttonText.toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{getText()}</Text>
    </TouchableOpacity>
  );
};

RoundedButton.PropTypes = {
  navigator: React.PropTypes.object,
  text: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  children: React.PropTypes.string
};

export default RoundedButton;
