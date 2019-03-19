import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get("window");
export default (styles = StyleSheet.create({
  header: {
    backgroundColor: "#2F497E",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoStyle: {
    //position: "relative",
    height: 50,
    width: 50,
    alignSelf: "flex-start"
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "white"
  },
  drawerHeader: {
    paddingVertical: 20,
    borderTopRightRadius: 10,
    backgroundColor: "#2f497e",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10
    // flexDirection: "column",
    // justifyContent: "space-between"
  },
  drawerOptions: {
    paddingVertical: 20,
    padding: 10,
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontSize: 18,
    color: "white"
    //backgroundColor:"#676761"
  },
  drawer: {
    paddingTop: 10,
    //paddingLeft:5,
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
    //backgroundColor:"#676761"
  }
}));
