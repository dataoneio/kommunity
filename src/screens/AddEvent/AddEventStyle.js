import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  ImageContainer: {
    position: "relative",
    top: 40,
    width: (win.width * 2) / 3,
    height: win.height / 2.5,
    padding: 0,

    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    left: win.width / 6,
    paddingBottom: 100
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
    fontSize: 18,
    color: "white"
  }
}));
