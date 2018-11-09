import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';

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

  render() {
    const {
      navigation: {
        state: {
          params: {
            entryId,
          },
        },
      },
      metrics,
    } = this.props;
    return (
      <View style={[styles.container]}>
        <MetricCard metrics={metrics} />
        <Text>EntryDetails.js - {entryId}</Text>
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

export default connect(mapStateToProps)(EntryDetails);
