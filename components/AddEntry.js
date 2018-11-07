import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import { submitEntry, removeEntry } from '../utils/api';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import TextButton from './TextButton';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends Component {
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
      const count = prevState[metric] + step;

      return {
        ...prevState,
        [metric]: count > max ? max : count,
      };
    })
  }

  decrement = (metric) => {
    this.setState((prevState) => {
      const { step } = getMetricMetaInfo(metric);
      const count = prevState[metric] - step;

      return {
        ...prevState,
        [metric]: count < 0 ? 0 : count,
      };
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }));
  }

  submit = () => {
    const { dispatchAddEntry } = this.props;
    const key = timeToString();
    const entry = this.state;

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    dispatchAddEntry({
      [key]: entry,
    });

    // Navigate to home

    submitEntry({ key, entry });

    // Clear local notification
  }

  reset = () => {
    const { dispatchAddEntry } = this.props;
    const key = timeToString();

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    dispatchAddEntry({
      [key]: getDailyReminderValue(),
    });

    // Route to home

    removeEntry(key);
  }

  render() {
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo();

    if (alreadyLogged) {
      return (
        <View>
          <Ionicons
            name={'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

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

const mapStateToProps = (state) => {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatchAddEntry: (entry) => dispatch(addEntry(entry)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEntry);
