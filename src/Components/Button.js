import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RoundedButtonStyles, DrawerButtonStyles, FullButtonStyles } from './Styles/ButtonStyle';

const Button = (props) => {
  const getComponentProperties = () => {
    switch (props.buttonType) {
      case 'RoundedButton':
        return {
          styles: RoundedButtonStyles,
          text: (props.text || props.children.toString()).toUpperCase()
        };
      case 'DrawerButton':
        return {
          styles: DrawerButtonStyles,
          text: (props.text || props.children.toString())
        };
      case 'FullButton':
        return {
          styles: FullButtonStyles,
          text: (props.text || props.children.toString()).toUpperCase()
        };
      default:
        return {
        styles: {},
        text: {}
      };
    }
  };

  const { styles, text } = getComponentProperties();

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.PropTypes = {
  navigator: React.PropTypes.object,
  text: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  children: React.PropTypes.string,
  buttonType: React.PropTypes.string.isRequired
};

export default Button;
