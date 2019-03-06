import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
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
      console.log("no value");
      this.props.navigation.navigate("Login");
    } else {
      console.log("value already stored");
      this.props.navigation.navigate("Home");
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
      <View style={{ flex:1 }}>
         <ContentLoader height={300}>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
            <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
            <Rect x="0" y="70" rx="5" ry="5" width="400" height="200" />
          </ContentLoader>
          <ContentLoader height={300}>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
            <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
            <Rect x="0" y="70" rx="5" ry="5" width="900" height="200" />
          </ContentLoader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});