import React, { Component } from "react";

// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

// import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image
} from "react-native";
// import { TextInput } from "react-native-paper";
// import firebase from "../../../Firebase";
const win = Dimensions.get("window");

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: ""
    };
  }

  render() {
    return (
      <View style={{ marginHorizontal:10,borderColor: "#dddce2", borderRadius: 5, borderWidth: 2 }}>
        <View style={{ flexDirection: "row", justifyContent:"flex-start" ,padding: 10 }}>
          <Image
            style={styles.ImageContainer1}
            source={{ uri: this.props.image }}
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "stretch"
            }}
          >
            <Text style={{ paddingLeft:10}}>{this.props.name}</Text>
            <Text style={{ paddingTop:5,paddingLeft:10}}>{this.props.gender}</Text>
            <Text style={{ paddingTop:5,paddingLeft:10}}>{this.props.city}</Text>

          </View>
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
  occurance: {
    fontFamily: "lucida grande",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black"
  },
  city: {
    fontFamily: "lucida grande",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "black"
  },
  header: {
    backgroundColor: "#2f497e",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50
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
