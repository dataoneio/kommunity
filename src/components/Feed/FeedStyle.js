import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get("window");
export default (styles = StyleSheet.create({
  note: {
    position: "relative",
    padding: 0,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 5
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  },
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25
  },
  date: {
    fontFamily: "lucida grande",
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 14
  },
  username: {
    fontFamily: "lucida grande",
    paddingLeft: 5,
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  title: {
    fontFamily: "lucida grande",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: "black",
    fontWeight: "bold"
  },
  description: {
    fontFamily: "lucida grande",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: "black"
  },
  data: {
    fontFamily: "lucida grande",
    color: "black"
  }
}));
