import React, { Component } from "react";

import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import email from "react-native-email";

export default class ReportProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: ""
    };
  }
  handleEmail = () => {
    const to = ["communitysocialnetworkingapp@gmail.com"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: ["kunalshah4345@gmail.com"], // string or array of email addresses
      bcc: "", // string or array of email addresses
      subject: this.state.Subject,
      body: this.state.description
    }).catch(console.error);
  };

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.home}>Feedback</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
          <TouchableOpacity
            title="request"
            onPress={this.handleEmail.bind(this)}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.sendButton}>Send</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Subject"
            placeholder="Subject"
            placeholderTextColor="#676261"
            onChangeText={Subject => this.setState({ Subject })}
            value={this.state.Subject}
            style={{ backgroundColor: "transparent" }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <AutoGrowingTextInput
            label="Body"
            style={{
              padding: 10,
              width: this.state.testWidth,
              borderBottomColor: "#908a89",
              borderBottomWidth: 0.5,
              fontSize: 16
            }}
            onChangeText={description => this.setState({ description })}
            maxLength={200}
            // value={this.state.descInput.slice(0, 200)}
            placeholder={"Your problem description"}
            placeholderTextColor="#908a89"
            value={this.state.description}
          />
        </View>
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
    backgroundColor: "#2f497e",
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
