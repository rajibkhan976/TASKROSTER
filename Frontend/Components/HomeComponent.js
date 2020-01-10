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
			console.log(data);
			this.setState({
				showTodos: false,
				showTaskManager: false,
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
			response.json();
		})
		.then((response) => {
			console.log('Task removed successfully ', JSON.stringify(response));
			this.getToDos();
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
            <View style={styles.logoView}>
                <Image style={styles.logo} source={require('./large_taskroster.png')} />
            </View>
			{this.state.showTodos ? 
			<View style={styles.infoContainer}>
                <Text style={styles.infoText}>Welcome!</Text>
                <Text style={styles.addButton} onPress={(e) => this.addTask(e)}> Add Task <Ionicons name="md-add-circle-outline" size={20}/></Text>
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
                        <View style={styles.iconView}>
                            <Icon iconStyle={styles.iconEdit} name="edit" type="font-awesome" onPress={(e) => this.getTaskById(item._id, e)}/>
                            <Icon iconStyle={styles.iconDelete} name="trash" type="font-awesome" onPress={(e) => this.authorizeTaskRemove(item._id, e)}/> 
                        </View>
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