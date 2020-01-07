import React, { Component } from 'react';
import { Image, Text, View, FlatList, Item } from 'react-native';
import styles from '../Style';

export default class HomeComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            todos: [],
            title: '',
			description: '',
			date: undefined,
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
                renderItem={({item}) => 
                    <Text style={styles.eachTask}>
                        <Text style={styles.title}>{item.title}</Text>{"\n"}
                        <Text>{item.description}</Text>{"\n"} 
                        <Text>{item.date}</Text> 
                    </Text>}
                keyExtractor={item => item._id}
            />
        </View>
	  </View>
	);
  }
}