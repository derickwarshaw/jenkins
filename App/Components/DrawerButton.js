import React, { PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Styles/DrawerButtonStyles';

const DrawerButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

DrawerButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
};

export default DrawerButton;
