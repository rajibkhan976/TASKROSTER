import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from '../Style';

// import DateTimePicker from '@react-native-community/datetimepicker';


export default class TaskManagerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            date: new Date('2020-06-12T14:42:42'),
            error: ''
            
        };
    }

    updateTaskById = (taskId, e) => {
		if (
		this.state.title !== undefined &&
		this.state.description !== undefined &&
		this.state.date !== undefined
		) {
			fetch("http://localhost:3000/todos" + taskId, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000/',
				'Access-Control-Allow-Credentials': 'true',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: this.state.title,
					description: this.state.description,
					date: this.state.date
				})
			})
			.then((response) => {
				alert('Task updated successfully:)')
			})
			.catch((error) => {
				this.setState({
					error: error
				});
			})
		} else {
			alert('Please enter the information correctly!');
		}
	}

    handleTitle = event => {
        this.setState({
            title: event.target.value
        })

    }

    handleDescription = event => {
        this.setState({
            description: event.target.value
        })
    }



    postTask = () => {
         fetch("http://localhost:3000/todos", {
       method: 'POST',
       body: JSON.stringify({
           title: this.state.title,
           description: this.state.description,
           date: this.state.date
       }),
       headers: {
         'Content-Type': 'application/json'
       }
     }).then(res => res.json())
       .then(response => console.log('Success:', JSON.stringify(response)))
       .catch(error => console.error('Error:', error));
    }

    dateChange = event => {
        this.setState({
            date: event.target.value
        })

    }

    render() {
        console.log(this.state.title)
        console.log(this.state.date)
        console.log(this.state.description)
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Add your task!</Text>
                <TextInput placeholder='Title'
                    style={styles.form}
                    value={this.state.title}
                    onChange={this.handleTitle} />
                <TextInput placeholder='Description'
                    style={styles.form}
                    value={this.state.description}
                    onChange={this.handleDescription} />
                <TextInput placeholder='Date'
                    style={styles.form}
                    value={this.state.date}
                    onChange={this.dateChange} />
                <Button title='ADD'
                    style={styles.button}
                    onPress={this.postTask} />
                    {/* <DateTimePicker value={this.state.date}
                    display='calendar'/>         */}
            </View>
        );
    }
}
	

const style = StyleSheet.create({
   
});
