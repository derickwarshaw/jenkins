import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/AlertMessageComponentStyle';
import * as Animatable from 'react-native-animatable';
import { Metrics } from '../Themes/';
import Icon from 'react-native-vector-icons/Ionicons';

const AlertMessageComponent = (props) => {
  const { title } = props;
  let messageComponent = (
      <Animatable.View
      style={[styles.container, props.style]}
      delay={800}
      animation='bounceIn'
    >
      <View style={styles.contentContainer}>
        <Icon
          name={props.icon || 'ios-alert'}
          size={Metrics.icons.large}
          style={styles.icon}
        />
        <Text allowFontScaling={false} style={styles.message}>{title && title.toUpperCase()}</Text>
      </View>
    </Animatable.View>
    );

  return props.show ? messageComponent : null;
};

AlertMessageComponent.defaultProps = {
  show: true
};

AlertMessageComponent.PropTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  show: React.PropTypes.bool
};

export default AlertMessageComponent;
