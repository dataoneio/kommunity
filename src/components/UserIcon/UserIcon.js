import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  //Button,
  Dimensions
} from "react-native";
//import { Card } from "react-native-elements";
const win = Dimensions.get("window");
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserImage: ""
    };
  }

  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <View>
          <View style={{ paddingLeft: 5, paddingRight: 5 }}>
            <TouchableOpacity onPress={this.props.onUserIconPress}>
              <Image
                style={styles.ImageContainer1}
                source={{
                  uri: this.props.profile
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.username}>
              {this.props.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: "relative",
    padding: 0,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 5
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
  username: {
    width: 40,
    fontFamily: "lucida grande",
    alignSelf: "center",
    fontSize: 13,
    color: "black",
    fontWeight: "bold"
  },
  title: {
    fontFamily: "lucida grande",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: "black"
  },
  description: {
    fontFamily: "lucida grande",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: "black"
  },
  data: {
    fontFamily: "lucida grande",
    color: "black"
  }
});
