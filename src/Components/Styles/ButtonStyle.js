import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../Themes/';

module.exports = {
  RoundedButtonStyles: StyleSheet.create({
    button: {
      height: 45,
      borderRadius: 5,
      marginHorizontal: Metrics.section,
      marginVertical: Metrics.baseMargin,
      backgroundColor: Colors.fire,
      justifyContent: 'center'
    },
    buttonText: {
      color: Colors.snow,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: Fonts.size.medium,
      marginVertical: Metrics.baseMargin
    }
  }),
  DrawerButtonStyles: StyleSheet.create({
    button:{},
    buttonText: {
      ...Fonts.style.h5,
      color: Colors.snow,
      marginVertical: Metrics.baseMargin
    }
  }),
  FullButtonStyles: StyleSheet.create({
    button: {
      marginVertical: 5,
      borderTopColor: Colors.fire,
      borderBottomColor: Colors.bloodOrange,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: Colors.ember
    },
    buttonText: {
      margin: 18,
      textAlign: 'center',
      color: Colors.snow,
      fontSize: Fonts.size.medium,
      fontFamily: Fonts.bold
    }
  })
};
