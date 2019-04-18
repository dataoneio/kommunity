import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
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
      description: "",
      height: 40
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

    this.props.navigation.navigate("HomeNavigator");
    this.setState({
      Subject: "",
      description: ""
    });
  };

  updateSize = height => {
    this.setState({
      height
    });
  };

  render() {
    const { height } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              title=""
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.home}>Feedback</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Subject"
            placeholder="Subject"
            placeholderTextColor="#676261"
            onChangeText={Subject => this.setState({ Subject })}
            value={this.state.Subject}
            style={{
              backgroundColor: "transparent",
              borderBottomColor: "#908a89",
              borderBottomWidth: 0.5,
              fontSize: 16
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Body"
            style={{
              width: this.state.testWidth,
              // borderBottomColor: "#908a89",
              borderBottomWidth: 0.5,
              fontSize: 16,
              backgroundColor: "#FFFFFF"
            }}
            maxLength={200}
            placeholder="Your problem description"
            placeholderTextColor="#908a89"
            onChangeText={description => this.setState({ description })}
            editable={true}
            multiline={true}
            // value={this.state.description.slice(0, 200)}
            value={this.state.descInput}
            onContentSizeChange={e =>
              this.updateSize(e.nativeEvent.contentSize.height)
            }
          />
        </View>
        <View style={{ paddingBottom: 100, alignSelf: "center", padding: 20 }}>
          <Button
            onPress={this.handleEmail.bind(this)}
            title="Send"
            color="#C60C31"
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
