import React, {PropTypes} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

// Styles
import styles from './Styles/PresentationScreenStyle';

class BuildScreen extends React.Component {

  static propTypes = {
    build: PropTypes.object

  };

  render () {
    const { build } = this.props;

    const ghPluginContent = build.data.ghPluginData ? (
      <Text>{build.data.ghPluginData.ghprbActualCommitAuthor}</Text>
    ) : null;

    return (
      <View style={styles.mainContainer}>
        {ghPluginContent}
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
