// components/UdaciStepper.js

import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { white, purple, gray } from '../utils/colors';

export default function UdaciStepper ({ max, unit, step, value, onIncrement, onDecrement }) {
  const minusName = Platform.OS === 'ios' ? 'ios-remove' : 'md-remove';
  const plusName = Platform.OS === 'ios' ? 'ios-add' : 'md-add';
  const stepper = Platform.OS === 'ios'
    ? (<View style={[styles.iosBtnContainer]}>
        <TouchableHighlight onPress={onDecrement} underlayColor={purple} style={[styles.iosBtn]}>
          <Ionicons name={minusName} size={22} color={purple} />
        </TouchableHighlight>
        <TouchableHighlight onPress={onIncrement} underlayColor={purple} style={[styles.iosBtn, styles.iosBtnLast]}>
          <Ionicons name={plusName} size={22} color={purple} />
        </TouchableHighlight>
        </View>)
    : (<View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={onDecrement} style={[styles.androidBtn]}>
            <Ionicons name={minusName} size={22} color={white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement} style={[styles.androidBtn]}>
            <Ionicons name={plusName} size={22} color={white} />
          </TouchableOpacity>
        </View>)
  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {stepper}
      <View style={[styles.metricCounter]}>
        <Text style={[styles.value]}>{value}</Text>
        <Text style={[styles.unit]}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosBtnContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 5,
  },
  iosBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  iosBtnLast: {
    borderColor: purple,
    borderLeftWidth: 1,
  },
  androidBtn: {
    margin: 3,
    backgroundColor: purple,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value:{
    fontSize: 24,
    textAlign: 'center',
  },
  unit: {
    fontSize: 18,
    color: gray,
  },
});
