import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/FullButtonStyle';

const FullButton = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.styles]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text && props.text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

FullButton.PropTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
};

export default FullButton;
