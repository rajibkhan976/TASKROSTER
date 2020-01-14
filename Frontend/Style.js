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
    //height: '100%'
  },
  infoText: {
    fontSize: 20,
    lineHeight: 25
  },
  addButton: {
    fontSize: 20,
    marginTop: 20
  },
  flatList: {
    marginTop: 10,
    width: '100%',
    height: '80%',
  },
  eachTask: {
    height: 120,
    margin: 10,
    padding: 20,
    //shadowColor: "#000",
    //shadowOffset: {
      //width: 0,
      //height: 2,
    //},
    //shadowOpacity: 0.22,
    //shadowRadius: 6.22,
    //elevation: 3,
  },
  iconView: {
    //position: "absolute",
    //top: 20,
    //right: 20,
  },
  iconDelete: {
    marginLeft: 10,
  },
  iconEdit: {
    //fontSize: "20px"
  },
  iconRemoveMessage: {
	  margin: 15
  },
  iconCheck: {
	  position: "absolute",
	  top: 5,
	  left: 100,
	  //fontSize: "20px"
  },
  iconTimes: {
	  position: "absolute",
	  top: 5,
	  left: 160,
	  //fontSize: "20px"
  },
  iconArrowLeft: {
	  //position: "absolute",
	  //top: "-50px",
	  //left: "-60px",
  },
  
  //TaskManager
  message: {
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
      //padding: 50
      width: '100%'
  },
  form: {
      width: '100%',
      padding: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      textAlign: 'center'
  },
  button: {
      textAlign: 'center',
      fontSize: 40
  }
});
