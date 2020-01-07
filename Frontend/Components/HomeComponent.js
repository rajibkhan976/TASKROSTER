import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import styles from '../Style';

export default class HomeComponent extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
            todos: [],
			//title: '',
			//description: '',
			//date: undefined,
            //error: '',
            //dataSource: '',
		};
    }
    
    componentDidMount(){
        return fetch('http://localhost:3000/todos')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
              todos: data,
            }, function(){
    
            });
    
        })
        .catch((error) =>{
            console.error(error);
        });
    }
	
  render() {
    console.log('data', this.state.todos)
	return (
	  <View>
        <View style={styles.logoView}>
            <Image style={styles.logo} source={require('./large_taskroster.png')} />
        </View>
        <View style={styles.infoContainer}>
		    <Text style={styles.infoText}>Welcome!</Text>
            <Text style={styles.infoText}>These are your upcoming tasks:</Text>
            <View style={styles.logoView}>
                <Image style={styles.logo} source={require('./large_taskroster.png')} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Welcome!</Text>
                <Text style={styles.infoText}>These are your upcoming tasks:</Text>
                <FlatList
                    data={this.state.todos}
                    renderItem={({item}) => <Text>{item._id}</Text>}
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
	  </View>
	);
  }
}