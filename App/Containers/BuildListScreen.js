import React, {PropTypes} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import Actions from '../Actions/Creators';
import {Actions as NavigationActions} from 'react-native-router-flux';
import {connect} from 'react-redux';

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent';

// Styles
import styles from './Styles/BuildListStyle';

class BuildListScreen extends React.Component {

  static propTypes = {
    getBuild: PropTypes.func,
    build: PropTypes.object,
    builds: PropTypes.object,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this._noRowData = this._noRowData.bind(this);

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});
    const dataForRows = props.dataObjects.map((obj) => {
      const rawDate = new Date(obj.timestamp);
      const dateFormatted = rawDate.toLocaleString();
      return {
        number: obj.number,
        result: obj.result,
        timestamp: dateFormatted
      };
    });

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataForRows)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.builds.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.builds.data)
      });
    }

    if (nextProps.build.loaded) {
      NavigationActions.build();
    }
  }

  getBuild(jobName, buildNumber) {
    this.props.getBuild(jobName, buildNumber);
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight style={styles.row} onPress={() => this.getBuild(this.props.builds.selectedJob, rowData.number)}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{rowData.number}</Text>
          <Text style={styles.boldLabel}>{rowData.timestamp}</Text>
          <Text style={styles.label}>{rowData.result}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData() {
    return this.state.dataSource.getRowCount() === 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()}/>
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
    builds: state.builds,
    build: state.build
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBuild: (selectedJob, buildNumber) => dispatch(Actions.getBuild(selectedJob, buildNumber))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildListScreen);
