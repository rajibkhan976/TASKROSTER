import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // App.js styles
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

  //Home Component Styles
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
  addButton: {
    fontSize: 18,
    marginTop: 20
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
    color: '#3f8432',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12
  },
  iconView: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  iconRemoveMessage: {
    margin: 15,
    marginLeft: 0
  },
  iconCheck: {
    position: "absolute",
    top: 5,
    left: '40%',
  },
  iconTimes: {
    position: "absolute",
    top: 5,
    left: '60%',
  },
  iconArrowLeft: {
	  position: "absolute",
  },
  
  //TaskManager Component Styles
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  container: {
    paddingTop: 10,
    padding: 20,
    width: '100%'
  },
  form: {
    width: '100%',
    padding: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    textAlign: 'center',
    fontSize: 40,
  },
});
