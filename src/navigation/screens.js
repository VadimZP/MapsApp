import React from 'react';
import { Navigation } from 'react-native-navigation';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const registerScreen = (Component) => (props) => (
    <Component props={props} />
);

export default function registerScreens() {
  Navigation.registerComponent('Home', () => registerScreen(HomeScreen));
  Navigation.registerComponent('Search', () => registerScreen(SearchScreen));
}
