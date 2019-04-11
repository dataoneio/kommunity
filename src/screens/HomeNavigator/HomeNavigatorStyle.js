import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  cardTitle: {
    fontFamily: "lucida grande",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  card: {
    marginVertical: 5,
    width: win.width / 2 - 20,
    backgroundColor: "white",
    padding: 5,
    borderColor: "#d9d9d9",
    borderWidth: 0,
    borderRadius: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0
  },

  Image: {
    padding: 1,
    width: win.width / 4,
    height: win.height / 4.8,
    alignSelf: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  header: {
    backgroundColor: "#C60C31", //C60C31
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "white"
  }
}));
