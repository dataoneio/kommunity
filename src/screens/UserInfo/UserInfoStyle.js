import { StyleSheet } from "react-native";
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  ImageContainer1: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden"
  },
  header: {
    backgroundColor: "#C60C31",
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
    fontSize: 22,
    color: "white"
  }
}));
