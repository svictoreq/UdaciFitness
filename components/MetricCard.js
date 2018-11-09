import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateHeader from './DateHeader';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';

const MetricCard = ({ date, metrics }) => {
  return (
    <View>
      {date && <DateHeader date={date} />}
      {Object.keys(metrics).map((metric) => {
        const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric);

        return (
          <View style={[styles.metric]} key={metric}>
            {getIcon()}
            <View>
              <Text style={[styles.displayName]}>
                {displayName}
              </Text>
              <Text style={[styles.metricValues]}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12,
  },
  displayName: {
    fontSize: 20,
  },
  metricValues: {
    fontSize: 16,
    color: gray,
  },
});

export default MetricCard;
