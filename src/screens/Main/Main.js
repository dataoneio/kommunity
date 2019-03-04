import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";

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
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 34 }}>
          hello
        </Text>
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
