import {StyleSheet,Dimensions} from "react-native" 
const win = Dimensions.get("window");
export default styles = StyleSheet.create({
    note: {
      position: "relative",
      padding: 0,
      paddingBottom: 10,
      backgroundColor: "#1B2936"
    },
    ImageContainer1: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 50
    },
  
    noteText1: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      fontSize: 14,
      color: "white"
    },
    noteText2: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      fontSize: 14,
      color: "#8b8b8b"
    },
    noteText: {
      paddingLeft: 170,
      paddingRight: 30,
      color: "#8b8b8b"
    }
  });