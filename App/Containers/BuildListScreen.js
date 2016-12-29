import React, {PropTypes} from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent';

// Styles
import styles from './Styles/BuildListStyle';

class BuildListScreen extends React.Component {

  static propTypes = {
    builds: PropTypes.object
  };

  constructor (props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.dataObjects)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.builds.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.builds.data)
      });
    }
  }

  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.number}</Text>
        <Text style={styles.label}>{rowData.result}</Text>
      </View>
    );
  }

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0;
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataObjects: state.builds.data,
    builds: state.builds
  };
};

export default connect(mapStateToProps)(BuildListScreen);
