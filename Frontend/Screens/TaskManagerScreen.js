import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import TaskManagerComponent from '../Components/TaskManagerComponent';
import styles from '../Style';

//Scree component that is rendering the TaskManager component
export default class TaskManagerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TaskManagerComponent 
		task={this.props.task} 
		navigateToToDoList={this.props.navigateToToDoList}
		getToDoList={this.props.getToDoList}
		/>
      </View>
    );
  }
}