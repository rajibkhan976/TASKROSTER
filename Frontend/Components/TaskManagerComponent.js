import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from '../Style';
import { Icon } from 'react-native-elements';
//import DateTimePicker from '@react-native-community/datetimepicker';

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
		if (this.props.task !== undefined) {
			this.setState({
				title: this.props.task.title,
				description: this.props.task.description,
				date: this.props.task.date
			});
		}
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
            this.state.title !== '' &&
            this.state.description !== '' &&
            this.state.date !== ''
        ) {
            fetch("http://localhost:3000/todos/" + taskId, {
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
                    alert('Task updated successfully:)');
					this.props.navigateToToDoList();
					this.props.getToDoList();
                })
                .catch((error) => {
                    this.setState({
                        error: error
                    });
					this.props.navigateToToDoList();
					this.props.getToDoList();
                })
        } else {
            alert('Please enter the information correctly!');
			this.props.navigateToToDoList();
			this.props.getToDoList();
        }
    }


    postTask = () => {
       //http://localhost:3000/todos
	   //http://10.80.103.210:3000/todos
        if (
            this.state.title !== '' && this.state.description !== ''
        ) {
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
                .then((response) => {
					console.log('Success:', JSON.stringify(response));
					this.props.navigateToToDoList();
					this.props.getToDoList();
				})
                .catch((error) => {
					this.setState({
                        error: error
                    });
					this.props.navigateToToDoList();
					this.props.getToDoList();
				});
				this.setState({
                message: 'Task Added!'
            });
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
				<View>
					<Icon iconStyle={styles.iconArrowLeft} name="arrow-left" type="font-awesome" onPress={() => this.props.navigateToToDoList()}/>
				</View>
                <Text style={styles.message}>Add your task!</Text>
                <TextInput placeholder='Title'
                    style={styles.form}
                    value={title}
                    onChangeText={(title) => this.setState({ title })} />
                <TextInput placeholder='Description'
                    style={styles.form}
                    value={this.state.description}
                    onChangeText={(description) => this.setState({description})} />
				<TextInput placeholder='Date'
                    style={styles.form}
                    value={this.state.date}
                    onChangeText={(date) => this.setState({date})} /> 
                 <View>
          <Button onPress={this.datepicker} title="Add date" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Add time!" />
        </View>
        {/* show && <DateTimePicker value={date}
=======
                    value={description}
                    onChangeText={(description) => this.setState({ description })} />
                <View>
                    <Button onPress={this.datepicker} title="Add date" />
                </View>
                <View>
                    <Button onPress={this.timepicker} title="Add time!" />
                </View>
                {show && <DateTimePicker value={date}
>>>>>>> 547f11db1bb9e5bd3e0e2c8cd4d11e59fcd6a8f3
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
<<<<<<< HEAD
        */} 
		{this.props.task ?
		<Button title='Update task'
                    style={styles.button}
                    onPress={(e) => this.updateTaskById(this.props.task._id, e)} />
		:
		<Button title='Add task'
                    style={styles.button}
                    onPress={() => this.postTask()} />
		}
        </View>
        );
    }
}


const style = StyleSheet.create({

});
