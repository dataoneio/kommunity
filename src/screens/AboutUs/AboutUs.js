import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage,
  BackHandler,
  Linking
} from "react-native";
//import { TextInput } from "react-native-paper";
//import firebase from "../../../Firebase";
// import styles from "./InfoStyle";
//import ImagePicker from "react-native-image-picker";
//import fs from "react-native-fs";

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ""
    };
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <View />
          <Text style={styles.home}>About Us</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <Text>
          Tim is Indiana Jones for the digital age. I’ve already used his advice
          to go spearfishing on remote islands and ski the best hidden slopes of
          Argentina. Simply put, do what he says and you can live like a
          millionaire.” -Albert Pope, Derivatives Trading, UBS World
          Headquarters
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
  },

  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  header: {
    backgroundColor: "#C60C31",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
