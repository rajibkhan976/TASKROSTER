import React, { Component } from 'react';
import { Image, View } from 'react-native';
import styles from './Style';
import HomeScreen from './Screens/HomeScreen.js';

export default class App extends Component {
  render() {
    return (
      <View>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('./Images/large_taskroster.png')} />
        </View>
        <HomeScreen/>
      </View>
    );
  }
}