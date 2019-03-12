/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigator/AppContainer";
import { MenuProvider } from "react-native-popup-menu";

export default class App extends Component {
  render() {
    const screenProps = {
      user: {
        id: "amoli",
        number: "johndoe123",
        name: "john@doe.com"
      }
    };
    return (
      <MenuProvider>
        <AppContainer screenProps={screenProps} />
      </MenuProvider>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
