import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default class TaskManagerComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Add your task!</Text>
        <TextInput placeholder = 'Title' style={styles.form}/>
        <TextInput placeholder = 'Description' style={styles.form}/>
        <TextInput placeholder = 'Date' style={styles.form}/>
        <Button title='ADD' style={styles.button}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    message: {
        fontSize: 20,
        textAlign: 'center'
    },
  container: {
    padding: 50
  },
  form: {
    width: '80%',
    padding: 50,
    borderBottomColor: 'black',
     borderBottomWidth: 1,
     textAlign: 'center'
  },
  button: {
      textAlign: 'center',
      fontSize: 40
  }
});
