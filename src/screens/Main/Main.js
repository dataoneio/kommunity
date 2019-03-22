import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  Dimensions
} from "react-native";
import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
const win = Dimensions.get("window");

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setToken: "",
      getToken: ""
    };
  }
  isToken() {
    if (this.state.getToken === null) {
      setTimeout(() => {
        console.log("value already stored");
        this.props.navigation.navigate("Login");
      }, 3000);
    } else {
      setTimeout(() => {
        console.log("value already stored");
        this.props.navigation.navigate("HomeNavigator");
      }, 3000);
    }
  }
  componentDidMount() {
    console.log("did mount");
    this.getValueLocally();
  }

  getValueLocally = () => {
    AsyncStorage.getItem("token").then(value =>
      this.setState({ getToken: value }, () => this.isToken())
    );
  };

  render() {
    return (
      // <View
      //   style={{
      //     padding:0
      //     //   backgroundColor: "red",
      //     // justifyContent: "center",
      //     // alignItems: "center"
      //   }}
      // >
        <Image
          style={styles.Image}
          source={require("../../assets/splash.jpg")}
        />
      // {/* </View> */}
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  Image: {
    marginLeft:0,
    justifyContent:"flex-start",
    width: win.width,
    height: win.height
  }
});
