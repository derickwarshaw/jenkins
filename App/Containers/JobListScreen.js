import React, {PropTypes} from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../Actions/Creators';
import { Actions as NavigationActions } from 'react-native-router-flux';

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent';

// Styles
import styles from './Styles/JobListStyle';

class JobListScreen extends React.Component {

  static propTypes = {
    jobs: PropTypes.object,
    builds: PropTypes.object,
    buildList: PropTypes.func,
    dispatch: PropTypes.func,
    getBuilds: PropTypes.func
  };

  constructor (props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._noRowData = this._noRowData.bind(this);

    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.dataObjects)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jobs.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.jobs.data)
      });
    }

    if (nextProps.builds.loaded) {
      NavigationActions.buildList();
    }
  }

  getBuilds(name) {
    this.props.getBuilds(name);
  }

  _renderRow (rowData) {
    return (
      <TouchableHighlight style={styles.row} onPress={() => this.getBuilds(rowData.name)}>
      <View style={styles.row} >
        <Text style={styles.boldLabel}>{rowData.name}</Text>
        <Text style={styles.label}>{rowData.color}</Text>
      </View>
      </TouchableHighlight>
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
    jobs: state.jobs,
    dataObjects: state.jobs.data,
    builds: state.builds,
    buildList: NavigationActions.buildList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBuilds: (jobName) => dispatch(Actions.getBuilds(jobName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobListScreen);
