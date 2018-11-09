import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import TextButton from './TextButton';

class EntryDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      state: {
        params: {
          entryId,
        },
      },
    } = navigation;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  }

  shouldComponentUpdate (nextProps) {
    const {
      metrics,
    } = nextProps;

    return metrics !== null && !metrics.today;
  }

  reset = () => {
    const {
      navigation: { goBack },
      resetEntry,
      entryId,
    } = this.props;

    resetEntry();
    goBack();
    removeEntry();
  }

  render() {
    const {
      entryId,
      metrics,
    } = this.props;
    return (
      <View style={[styles.container]}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={[styles.textButton]}>
          RESET
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  textButton: {
    margin: 20,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state, { navigation }) => {
  const {
    state: {
      params: {
        entryId,
      },
    },
  } = navigation;

  return {
    entryId,
    metrics: state[entryId],
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const {
    state: {
      params: {
        entryId,
      },
    },
  } = navigation;

  return {
    resetEntry: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryDetails);
