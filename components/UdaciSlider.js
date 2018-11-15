// components/UdaciSlider.js

import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

export default function UdaciSlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={[styles.row]}>
      <Slider
        style={[styles.slider]}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={[styles.metricCounter]}>
        <Text style={[styles.value]}>{value}</Text>
        <Text style={[styles.unit]}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    textAlign: 'center',
  },
  unit: {
    fontSize: 18,
    color: gray,
  },
});
