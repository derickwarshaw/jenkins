import React, {PropTypes} from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';

// Styles
import styles from './Styles/PresentationScreenStyle';

class BuildScreen extends React.Component {

  static propTypes = {
    build: PropTypes.object

  };

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>{this.props.build.data.ghprbActualCommitAuthor}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    build: state.build

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildScreen);
