import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
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
		fetch('http://10.80.101.40:3000/todos')
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
		fetch("http://10.80.101.40:3000/todos/" + taskId)
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
		fetch("http://10.80.101.40:3000/todos/" + taskId, {
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
                <Text style={styles.addButton} onPress={(e) => this.addTask(e)}> Add Task <Ionicons name="md-add-circle-outline" size={26}/></Text>
                <FlatList
                    style={styles.flatList}
                    data={this.state.todos}
                    keyExtractor={item => item._id}
					extraData={this.state.showAuthorizeMessgae}
                    renderItem={({item}) => 
                    <Text style={styles.eachTask}>
                        <Text style={styles.title}>{item.title}</Text>{"\n"}
                        <Text>{item.description}</Text>{"\n"} 
                        <Text>{moment(item.date).format('YYYY-MM-DD, hh:mm a')}</Text>
                        <Text style={styles.iconView}>
							<Ionicons name="ios-create" size={30} onPress={(e) => this.getTaskById(item._id, e)}/>
							<Ionicons name="ios-trash" size={30} onPress={(e) => this.authorizeTaskRemove(item._id, e)} />
						</Text>
						{this.state.showAuthorizeMessgae.includes(item._id) ?
							<View style={styles.iconRemoveMessage}>
								<Text>{this.state.authorization}</Text>
								<View>
									<Icon iconStyle={styles.iconCheck} name="check" type="font-awesome" onPress={(e) => this.removeTaskById(this.state.taskId, e)}/> 
									<Icon iconStyle={styles.iconTimes} name="times" type="font-awesome" onPress={(e) => this.abortRemoveAction(e)}/>
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