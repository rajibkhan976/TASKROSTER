import React, { Component } from 'react';
import { Image, Text, View, FlatList } from 'react-native';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
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
                            <Icon iconStyle={styles.iconEdit} name="edit" type="font-awesome" onPress={() => console.log('it`s been pressed')}/>
                            <Icon iconStyle={styles.iconDelete} name="trash" type="font-awesome" onPress={() => console.log('it`s been deleted')}/> 
                        </View>
                    </Text>}
                />
            </View>
	    </View>
	);
  }
}