import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //Home Styles
  logo: {
    width: '50%',
    height: 100,
    marginTop: 10,
    marginTop: 40
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
    //height: '100%'
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
  iconView: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "block"
  },
  iconDelete: {
    marginLeft: "10px",
    fontSize: "20px"
  },
  iconEdit: {
    fontSize: "20px"
  },
  iconRemoveMessage: {
	  margin: 15
  },
  iconCheck: {
	  position: "absolute",
	  top: "5px",
	  left: "100px",
	  fontSize: "20px"
  },
  iconTimes: {
	  position: "absolute",
	  top: "5px",
	  left: "160px",
	  fontSize: "20px"
  },
  iconArrowLeft: {
	  position: "absolute",
	  top: "-50px",
	  left: "-60px",
  },
  
  //TaskManager
  message: {
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
      padding: 20,
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
