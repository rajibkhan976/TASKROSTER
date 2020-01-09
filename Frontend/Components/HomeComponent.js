import React, { Component } from 'react';
import { Image, Text, View, FlatList } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Style';
import TaskManagerScreen from '../Screens/TaskManagerScreen';

export default class HomeComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            todos: [],
			task: {},
            title: '',
			description: '',
			date: undefined,
			showTodos: true,
			addTask: false,
			editTask: false
		};
    }
    
    componentDidMount(){
        return fetch('http://localhost:3000/todos')
        .then((response) => {
			return response.json();
		})
        .then((data) => {
            this.setState({
                todos: data,
                title: data.title,
                description: data.description,
                date: data.date
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    
    
    getTaskById = (taskId, e) => {
		fetch("http://localhost:3000/todos/" + taskId)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			this.setState({
				showTodos: false,
				task: data,
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
	
	removeTaskById = (taskId, e) => {
		var removeConfirmation = prompt('If you are sure that you want to remove this task then enter y otherwise enter n', ' ');
		if (removeConfirmation.trim().toLowerCase() === 'y') {
			fetch("http://localhost:3000/todos/" + taskId, {
			method: 'DELETE'
		})
		.then((response) => {
			response.json();
		})
		.then((response) => {
			console.log('Task removed successfully ', JSON.stringify(response));
			})
			.catch((error) => {
				this.setState({
					error: error
				});
			})
		} else {
			alert('Action aborted!');
		}
	}
    
  render() {
	return (
        <View>
            <View style={styles.logoView}>
                <Image style={styles.logo} source={require('./large_taskroster.png')} />
            </View>
			{this.state.showTodos ? 
			<View style={styles.infoContainer}>
                <Text style={styles.infoText}>Welcome!</Text>
                <Text style={styles.addButton} onPress={this.hello}> Add Task <Ionicons name="md-add-circle-outline" size={20}/></Text>
                <FlatList
                    style={styles.flatList}
                    data={this.state.todos}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => 
                    <Text style={styles.eachTask}>
                        <Text style={styles.title}>{item.title}</Text>{"\n"}
                        <Text>{item.description}</Text>{"\n"} 
                        <Text>{moment(item.date).format('YYYY-MM-DD, hh:mm a')}</Text>
                        <View style={styles.iconView}>
                            <Icon iconStyle={styles.iconEdit} name="edit" type="font-awesome" onPress={(e) => this.getTaskById(item._id, e)}/>
                            <Icon iconStyle={styles.iconDelete} name="trash" type="font-awesome" onPress={(e) => this.removeTaskById(item._id, e)}/> 
                        </View>
                    </Text>}
                />
            </View>
			:
			<View>
				<TaskManagerScreen task={this.state.task} />
			</View>
			}
	    </View>
	);
  }
}