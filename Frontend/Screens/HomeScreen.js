import React, { Component } from 'react';
import { View } from 'react-native';
import HomeComponent from '../Components/HomeComponent.js';


//Simple screen for the home page, containing the Home Component
export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <HomeComponent/>
      </View>
    );
  }
}