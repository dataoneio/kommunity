
import { StyleSheet,Dimensions } from 'react-native';
const wid = Dimensions.get("window");

export default styles= StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E3E7E6",
      padding: 10
    },
    header: {
      backgroundColor: "#243545",
      //alignItems: "center",
      //justifyContent: "center",
      borderBottomWidth: 2,
      borderBottomColor: "white",
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    next:{
      color: "white",
      paddingRight: 10,
      padding: 4,
      paddingLeft: 15,
      fontSize: 18,
      borderLeftWidth: 2,
      borderLeftColor: "white"
    },
    boxOne: {
      justifyContent: "center",
      paddingTop: 10
    },
    logoStyle:{
      position: "relative",
      height: 150,
      width: 150,
      top: 80,
      alignSelf: "center"
    },
    mobileInput:{
      flex: 1,
      paddingLeft: 10,
      fontSize: 16,
      height: 40,
      width: wid.width * 0.95,
      backgroundColor: "#FFFFFF"
    },
    verifyButton:{
      color: "white",
      paddingRight: 10,
      padding: 4,
      paddingLeft: 15,
      fontSize: 18,
      borderLeftWidth: 2,
      borderLeftColor: "white"
    },
    boxTwo: {
      position: "relative",
      top: 130,
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: "white",
      padding: 5,
      width: wid.width * 0.95
    },
  
    home: {
      fontFamily: "lucida grande",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: 22,
      color: "white"
    }
  });