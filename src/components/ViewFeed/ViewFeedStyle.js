import { StyleSheet } from "react-native";
export default (styles = StyleSheet.create({
  header: {
    backgroundColor: "#C60C31",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  title: {
    padding: 10,
    fontSize: 24,
    fontFamily: "lucida grande",
    fontWeight: "bold",
    paddingBottom: 20,
    color: "black"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  description: {
    padding: 10,
    fontSize: 18,
    fontFamily: "lucida grande",
    color: "#8b8b8b"
  },
  commentButton1: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 55,
    backgroundColor: "#676261", //"#C60C31",
    width: 70,
    height: 70,
    borderRadius: 35,
    //borderBottomWidth:1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
}));
