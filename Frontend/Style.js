import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
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
