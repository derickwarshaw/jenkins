import React, {PropTypes} from 'react'
import { View, Text, ListView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessageComponent'

// Styles
import styles from './Styles/JobListStyle'

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

    /* ***********************************************************
     * STEP 1
     * This is an array of objects with the properties you desire
     * Usually this should come from Redux mapStateToProps
     *************************************************************/


    /* ***********************************************************
     * STEP 2
     * Teach datasource how to detect if rows are different
     * Make this function fast!  Perhaps something like:
     *   (r1, r2) => r1.id !== r2.id}
     *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2;

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged});

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.dataObjects)
    }
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

  /* ***********************************************************
   * STEP 3
   * `_renderRow` function -How each cell/row should be rendered
   * It's our best practice to place a single component here:
   *
   * e.g.
   return <MyCustomCell title={rowData.title} description={rowData.description} />
   *************************************************************/
  _renderRow (rowData) {
    return (
      <TouchableHighlight onPress={() => this.getBuilds(rowData.name)}>
      <View style={styles.row} >
        <Text style={styles.boldLabel}>{rowData.name}</Text>
        <Text style={styles.label}>{rowData.color}</Text>
      </View>
      </TouchableHighlight>
    )
  }

  /* ***********************************************************
   * STEP 4
   * If your datasource is driven by Redux, you'll need to
   * reset it when new data arrives.
   * DO NOT! place `cloneWithRows` inside of render, since render
   * is called very often, and should remain fast!  Just replace
   * state's datasource on newProps.
   *
   * e.g.
   componentWillReceiveProps (newProps) {
   if (newProps.someData) {
   this.setState({
   dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
   })
   }
   }
   *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.data,
    dataObjects: state.jobs.data,
    builds: state.builds,
    buildList: NavigationActions.buildList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBuilds: (jobName) => dispatch(Actions.getBuilds(jobName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobListScreen)
