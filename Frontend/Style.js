import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //Home Styles
  logo: {
    width: '50%',
    height: 100,
    marginTop: 10,
  },
  logoView: {
      borderBottomWidth: 1,
      borderColor: 'lightgray',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      height: '100%'
  },
  infoText: {
      fontSize: 20,
      lineHeight: 25
  },
  flatList: {
    marginTop: 10,
    width: '100%'
  },
  eachTask: {
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 6.22,
    elevation: 3,
  },
  title: {
    fontWeight: 600,
    textTransform: 'uppercase'
  },

  //General
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  
  //TaskManager
  message: {
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
      padding: 50
  },
  form: {
      width: '80%',
      padding: 50,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      textAlign: 'center'
  },
  button: {
      textAlign: 'center',
      fontSize: 40
  }
});
