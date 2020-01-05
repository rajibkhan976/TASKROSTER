import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default class TaskManagerComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			title: '',
			description: '',
			date: undefined,
			error: ''
		};
	}
	
	getTaskById = (taskId, e) => {
		fetch("http://localhost:3000/todos/" + taskId)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.setState({
				title: data.title,
				description: data.description,
				date: data.date
			});
		})
		.catch((error) => {
			this.setState({
				error: error
			})
		})
	}
	
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
