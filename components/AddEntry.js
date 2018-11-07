import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((prevState) => {
      const count = state[metric] + step;

      return {
        ...prevState,
        [metric]: count > max ? max : count,
      };
    })
  }

  decrement = (metric) => {
    this.setState((prevState) => {
      const { step } = getMetricMetaInfo(metric);
      const count = state[metric] - step;

      return {
        ...prevState,
        [metric]: count < 0 ? 0 : count,
      };
    })
  }

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    // Update Redux

    // Navigate to home

    // Save to 'DB'

    // Clear local notification
  }

  render() {
    const metaInfo = getMetricMetaInfo();

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {
                type === 'slider'
                  ? <UdaciSlider
                      value={value}
                      onChange={(value) => this.slide(key, value)}
                      {...rest}
                    />
                  : <UdaciStepper
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      {...rest}
                    />
              }
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}
