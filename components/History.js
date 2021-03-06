import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { white } from '../utils/colors';
import { receiveEntries, addEntry } from '../actions';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

class History extends Component {
  state = {
    ready: false,
  };

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

  renderItem = ({ today, ...metrics }, formattedDate, key) => {
    const { navigation } = this.props;
    const navigateOptions = [
      'EntryDetails',
      {
        entryId: key,
      },
    ];
    return(
      <View style={[styles.item]}>
        {today
          ? (<View>
              <DateHeader date={formattedDate} />
              <Text style={[styles.noDataText]}>
                {today}
              </Text>
            </View>)
          : <TouchableOpacity onPress={() => navigation.navigate(...navigateOptions)}>
              <MetricCard metrics={metrics} date={formattedDate} />
            </TouchableOpacity>
        }
      </View>
    );
  }

  renderEmptyDate = (formattedDate) => {
    return (
      <View style={[styles.item]}>
        <DateHeader date={formattedDate} />
        <Text style={[styles.noDataText]}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props;
    const { ready } = this.state;

    if (!ready) return <AppLoading />
    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

const mapStateToProps = (entries) => ({
  entries,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchReceiveEntries: (entries) => dispatch(receiveEntries(entries)),
  dispatchAddEntry: (entry) => dispatch(addEntry(entry)),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
