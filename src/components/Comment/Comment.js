import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
//import firebase from "../../../Firebase";
export default class Comment extends Component {
  componentDidMount() {
    console.log("did mount of comment");
  }

  render() {
    return (
      <View>
        <View
          key={this.props.keyval}
          style={{ backgroundColor: "transparent" }}
        >
          <TouchableOpacity onPress={this.props.testing}>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <View>
                <Image
                  style={styles.ImageContainer1}
                  source={{
                    uri: this.props.profile
                  }}
                />
              </View>
              <View style={{ paddingLeft: 5, paddingRight: 2 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 12,
                    fontFamily: "lucida grande",
                    fontWeight: "bold"
                  }}
                >
                  {this.props.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ paddingLeft: 30 }}>
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontFamily: "lucida grande",
                paddingRight: 90
              }}
            >
              {this.props.val.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 25
  }
});
