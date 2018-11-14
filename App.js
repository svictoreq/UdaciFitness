import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';
import { purple, white } from './utils/colors';
import reducer from './reducers';
import History from './components/History';
import AddEntry from './components/AddEntry';
import EntryDetails from './components/EntryDetails';
import Live from './components/Live';

const UdaciStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcons: ({ tintColor }) => <Ionicons name={'ios-bookmarks'} size={30} color={tintColor} />,
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcons: ({ tintColor }) => <FontAwesome name={'plus-square'} size={30} color={tintColor} />,
    },
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcons: ({ tintColor }) => <Ionicons name={'ios-speedometer'} size={30} color={tintColor} />,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetails: {
    screen: EntryDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle={'light-content'} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
