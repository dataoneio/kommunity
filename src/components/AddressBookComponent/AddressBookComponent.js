import React, { Component } from "react";

// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

// import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,Dimensions
} from "react-native";
// import { TextInput } from "react-native-paper";
// import firebase from "../../../Firebase";
const win = Dimensions.get("window");

export default class AddressBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
    };
  }


  render() {
    return (
      <View
        style={{
          width: win.width / 2 - 20,
          height:win.height/5,
          backgroundColor: "#dddce2",
          padding: 5,
          borderWidth: 2,
          borderRadius:10,
          borderColor: "white",
          justifyContent:"space-evenly"
        }}
      >
      <TouchableOpacity onPress={this.props.getCityUserDetails}>
        <Text style={styles.city}>{this.props.city}</Text>
        <Text style={styles.occurance}>{this.props.occurance}</Text>
        </TouchableOpacity>
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
  occurance:{
    fontFamily: "lucida grande",
    textAlign:"center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black"

  },
  city: {
    fontFamily: "lucida grande",
    textAlign:"center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "black"
  },
  header: {
    backgroundColor: "#C60C31",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sendButton: {
    color: "white",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  }
});
