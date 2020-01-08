import React, { Component } from 'react';
import { Image, Text, View, FlatList, Item, Button } from 'react-native';
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
    
  render() {
	return (
	  <View>
	  {this.state.showTodos ?
	  <View>
		<View style={styles.logoView}>
            <Image style={styles.logo} source={require('./large_taskroster.png')} />
        </View>
        <View style={styles.infoContainer}>
		    <Text style={styles.infoText}>Welcome!</Text>
            <Text style={styles.infoText}>These are your upcoming tasks:</Text>
            <FlatList
                style={styles.flatList}
                data={this.state.todos}
                renderItem={
					({item}) => 
                    <Text style={styles.eachTask}>
                        <Text style={styles.title}>{item.title}</Text>{"\n"}
                        <Text>{item.description}</Text>{"\n"} 
                        <Text>{item.date}</Text> 
						<Button title='Edit'
						style={styles.button}
						onPress={(e) => this.getTaskById(item._id, e)} />
                    </Text>
					}
                keyExtractor={item => item._id}
            />
        </View>
		</View>
		:
		<View>
		  <TaskManagerScreen task={this.state.task}/>
		</View>
		}
	  </View>
	);
  }
}