import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { TextInput } from "react-native-paper";
import Joining_Requests from "./JoiningRequests";
import firebase from "../Firebase";

import SendSMS from "react-native-sms";

export default class UserNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }
  componentDidMount() {
    console.log("will mount");
    this.getDataFromFirebase();
  }
  onPress1(Number) {
    SendSMS.send(
      {
        body: "testing for community app",
        recipients: [Number],
        successTypes: ["sent", "queued"],
        allowAndroidSendWithoutReadPermission: true
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            "error: " +
            error
        );
      }
    );
    
  }
  handlenavigation() {
    alert("navigated");
  }
  goback() {
    alert("go back");
  }
  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
    firebase
      .database()
      .ref("app/Joining_Requests")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        console.log("JOINING REQUESTS" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }
        console.log("key--" + key1);
        console.log("---" + result.length);

        arr1.push({
          Number: result[0].toString(),
          Name: result[1].toString()
        });
        this.setState({ requests: arr1 });
        console.log("Number" + result[0].toString());
        console.log("Name" + result[1].toString());
        console.log("aaawwww" + JSON.stringify(arr1));
      });
  }
  render() {
    let requestval = this.state.requests.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 0,
            
              // borderRadius: 5,
              // borderBottomWidth: 0.5,
              // borderBottomColor: "white",
              // backgroundColor: "#1B2936"
            }}
          >
            <Joining_Requests
              key={key}
              keyval={key}
              val={val}
              acceptingfunction={() => this.onPress1(val.Number)}
            />
          </View>
        </View>
      );
    });

    return (
      <View>
        <View style={styles.header}>
          <View>
            <TouchableOpacity title="" onPress={this.goback.bind(this)}>
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>Info</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              title=""
              onPress={this.handlenavigation.bind(this)}
            >
              <Icon name="edit" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View>
          <Button title="pressss me" onPress={this.onPress1.bind(this)}>
            press me
          </Button>
        </View> */}
        <View
          style={{
            flexWrap: "wrap-reverse",
            flexDirection: "column-reverse",
            backgroundColor: "transparent"
          }}
        >
          {requestval}
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white"
  },
  header: {
    backgroundColor: "#243545",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
