import React, { Component } from 'react';
import { Image, Text, View, FlatList, Item } from 'react-native';
import styles from '../Style';

export default class HomeComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            todos: []
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
            });
        })
        .catch((error) =>{
            console.error(error);
        });
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