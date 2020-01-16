import React, { Component } from 'react';
import { Text, View, FlatList, Button, Image } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Style';
import TaskManagerScreen from '../Screens/TaskManagerScreen';

//This component is responsible for showing the ToDoList, Removing task, fetching a specific
//task by id for update and also controls the conditional rendering to ensure navigation
export default class HomeComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            todos: [],
			task: {},
			showTodos: true,
			showTaskManager: false,
			authorization: '',
			taskId: '',
			showAuthorizeMessgae: []
		};
    }
    
    componentDidMount(){
        this.getToDos();
    }
	
	getToDos = () => {
		fetch('http://localhost:3000/todos')
        .then((response) => {
			return response.json();
		})
        .then((data) => {
            this.setState({
                todos: data
            });
        })
        .catch((error) =>{
            console.error(error);
        });
	}
    
	addTask = (e) => {
		this.setState({
			showTodos: false,
			showTaskManager: true
		});
	}
    
    getTaskById = (taskId, e) => {
		fetch("http://localhost:3000/todos/" + taskId)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.setState({
				showTodos: false,
				showTaskManager: false,
				task: data
			});
		})
		.catch((error) => {
			this.setState({
				error: error
			})
		})
    }
	
	authorizeTaskRemove = (taskId, e) => {
		if (!this.state.showAuthorizeMessgae.includes(taskId)) {
			this.setState({
			authorization: 'Are you sure that you want to remove this task?',
			showAuthorizeMessgae: [taskId],
			taskId: taskId
		});
		} else {
			this.setState({
			authorization: '',
			showAuthorizeMessgae: [],
			taskId: ''
		});
		}
	}
	
	abortRemoveAction = (e) => {
		this.setState({
			authorization: '',
			showAuthorizeMessgae: [],
			taskId: ''
		});
	}
	
	removeTaskById = (taskId, e) => {
		fetch("http://localhost:3000/todos/" + taskId, {
		method: 'DELETE'
		})
		.then((response) => {
			if (response.status === 200) {
				this.getToDos();
			}
		})
		.catch((error) => {
			this.setState({
				error: error
			});
		})
	}
	
	navigateToToDoList = () => {
		this.setState({
			showTodos: true
		});
	}
    
  render() {
	return (
        <View>
			{this.state.showTodos ? 
			<View style={styles.infoContainer}>
                <Text style={styles.infoText}>Welcome!</Text>
                <Text style={styles.addButton} onPress={(e) => this.addTask(e)}> Add Task <Ionicons name="md-add-circle-outline" size={22}/></Text>
                <FlatList
                    style={styles.flatList}
                    data={this.state.todos}
                    keyExtractor={item => item._id}
					extraData={this.state.showAuthorizeMessgae}
                    renderItem={({item}) => 
                    <Text style={styles.eachTask}>
                        <Text style={styles.title}>{item.title}</Text>{"\n"}
                        <Text>{item.description}</Text>{"\n"} 
                        <Text style={styles.date}>Deadline: {moment(item.date).format('YYYY-MM-DD, hh:mm a')}</Text>
                        <View style={styles.iconView}>
							              <Ionicons name="md-create" size={24} onPress={(e) => this.getTaskById(item._id, e)}/>
                            <Ionicons name="md-trash" size={24} onPress={(e) => this.authorizeTaskRemove(item._id, e)}/> 
                        </View>
						{this.state.showAuthorizeMessgae.includes(item._id) ?
							<View style={styles.iconRemoveMessage}>
								<Text>{this.state.authorization}</Text>
								<View>
									<Ionicons style={styles.iconCheck} name="md-checkmark" size={24} onPress={(e) => this.removeTaskById(this.state.taskId, e)}/> 
									<Ionicons style={styles.iconTimes} name="md-close" size={24} onPress={(e) => this.abortRemoveAction(e)}/>
								</View>
							</View>
							:
							null
						}
                    </Text>}
                />
            </View>
			:
			<View>
				{this.state.showTaskManager ? 
				<TaskManagerScreen 
				navigateToToDoList={this.navigateToToDoList}
				getToDoList={this.getToDos}
				/>
				:
				<TaskManagerScreen 
				task={this.state.task} 
				navigateToToDoList={this.navigateToToDoList}
				getToDoList={this.getToDos}
				/>
				}
			</View>
			}
	    </View>
	);
  }
}