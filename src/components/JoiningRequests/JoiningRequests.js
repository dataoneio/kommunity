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
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const win = Dimensions.get("window");
export default class JoiningRequests extends Component {
  accept() {
    this.props.acceptingfunction();
  }
  reject() {
    this.props.rejectingfunction();
  }
  render() {
    return (
      <View style={{ backgroundColor: "#f2f2f2" }}>
        <View
          style={{
            flexDirection: "row"
            // justifyContent: "space-evenly"
          }}
        >
          <View style={{ left: win.width / 100, width: "75%" }}>
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
              {this.props.val.Name}({this.props.val.Number}) has requested to
              join your app
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              left: 0,
              justifyContent: "space-evenly"
            }}
          >
            <View>
              <TouchableOpacity
                title="accept"
                onPress={this.accept.bind(this)}
              >
                <Icon name="done" color="green" size={40} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <TouchableOpacity
                title="reject"
                onPress={this.reject.bind(this)}
              >
                <Icon
                  name="close"
                  type="material-community"
                  size={40}
                  color="#cc0000"
                  style={{ paddingTop: 7 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


