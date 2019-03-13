import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

export default class CommentNotification extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.oncommentClick}>
          <Text
            style={{
              fontFamily: "lucida grande",
              paddingLeft: 5,
              // paddingRight:10,
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
              borderColor: "white"
            }}
          >
            {this.props.name} has commented "{this.props.val.text}" on your "
            {this.props.title}" post
          </Text>
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
