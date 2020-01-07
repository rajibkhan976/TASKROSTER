import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TaskManagerComponent from '../Components/TaskManagerComponent';



export default class TaskManagerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TaskManagerComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  padding: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
