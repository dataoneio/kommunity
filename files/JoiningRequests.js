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
  handlepress() {
    this.props.acceptingfunction();
  }
  handlepress1() {
    this.props.rejectingfunction();
  }
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row"
            // justifyContent: "space-evenly"
          }}
        >
          <View style={{paddingRight:0, width:"75%"}}>
            <Text
              style={{

                fontFamily: "lucida grande",
                paddingLeft: 5,
               // paddingRight:10,
                fontSize: 16,
                color: "black",
                fontWeight: "bold",
                borderColor: "white"
              }}
            >
              {this.props.val.Name}({this.props.val.Number}) has requested to
              join your app
            </Text>
          </View>
          <View style={{flexDirection:"row", paddingLeft:40}}>
            <View>
              <TouchableOpacity
                title="accept"
                onPress={this.handlepress.bind(this)}
              >
                <Icon name="done" color="green" size={35} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              title="reject"
              onPress={this.handlepress1.bind(this)}
            >
              <Icon
                name="close"
                type="material-community"
                size={35}
                color="red"
                style={{ paddingTop: 7 }}
              />
            </TouchableOpacity>
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
    backgroundColor: "#1B2936"
    //borderBottomWidth: 2,
    //borderBottomColor: "#ededed"
  },
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50
  },

  noteText1: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //fontWeight: "bold",
    fontSize: 14,
    color: "white"

    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText2: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //fontWeight:"bold",
    fontSize: 14,
    color: "#8b8b8b"

    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText: {
    paddingLeft: 170,
    paddingRight: 30,
    color: "#8b8b8b"
    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  }
});
