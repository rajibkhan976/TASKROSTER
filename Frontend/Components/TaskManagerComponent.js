import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from '../Style';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class TaskManagerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            date: '',
            error: '',
            mode: 'date',
            show: false,
            message: ''

        };
    }
    componentDidMount() {
        var today = new Date();
        var date = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        var time = (today.getHours()-1) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2)
        var dateTime = date + 'T' + time;
        parseInt(dateTime)
          this.setState({
              date: new Date(dateTime)
          })
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


    postTask = () => {
        if (
            this.state.title !== '' && this.state.description !== ''
        ) {
            fetch("http://10.80.103.210:3000/todos", {

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
            this.setState({
                message: 'Task Added!'
            })
        } else {
            alert('Please enter the information correctly!')
            this.setState({
                message: 'Task not Added!'
            })
        }
    }


    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    render() {
        console.log(this.state.title)
        console.log(this.state.description)
        console.log(this.state.date)
        const { show, date, mode, title, description, message } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Add your task!</Text>
                <TextInput placeholder='Title'
                    style={styles.form}
                    value={title}
                    onChangeText={(title) => this.setState({ title })} />
                <TextInput placeholder='Description'
                    style={styles.form}
                    value={description}
                    onChangeText={(description) => this.setState({ description })} />
                <View>
                    <Button onPress={this.datepicker} title="Add date" />
                </View>
                <View>
                    <Button onPress={this.timepicker} title="Add time!" />
                </View>
                {show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
                }
                <Button title='Add task'
                    style={styles.button}
                    onPress={this.postTask} />
                <Text style={styles.message}>{message}</Text>

            </View>
        );
    }
}


const style = StyleSheet.create({

});
