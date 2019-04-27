import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
export default class MatrimonialComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View key={this.props.key}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.ImageContainer1}
            source={{
              uri: this.props.val.Profile_photo
            }}
          />
        </View>
        <Text>{this.props.val.Name}</Text>
        <Text>{this.props.val.DOB}</Text>
        <Text>{this.props.val.age}</Text>
        <Text>{this.props.val.Marital_Status}</Text>
        <Text>{this.props.val.Highest_Qualification}</Text>
        <Text>{this.props.val.State}</Text>
        <Text>{this.props.val.City}</Text>
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
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    backgroundColor: "#fff"
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
