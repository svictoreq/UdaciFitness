import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { receiveEntries, addEntry } from '../actions';

class History extends Component {
  componentDidMount() {
    const {
      dispatchReceiveEntries,
      dispatchAddEntry,
    } = this.props;
    fetchCalendarResults()
      .then((entries) => dispatchReceiveEntries(entries))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatchAddEntry({
            [timeToString()]: getDailyReminderValue(),
          });
        }
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    return (
      <View>
        <Text>History.js</Text>
      </View>
    );
  }
}

const mapStateToProps = (entries) => ({
  entries,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchReceiveEntries: (entries) => dispatch(receiveEntries(entries)),
  dispatchAddEntry: (entry) => dispatch(addEntry(entry)),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
