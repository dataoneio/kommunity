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
  onPress1(Number, name, data, key) {
    SendSMS.send(
      {
        body: "You have been accepted as a member of our community",
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

    firebase
      .database()
      .ref("app/User/")
      .push({
        Name: name,
        Email: "",
        Profile_photo: "",
        Profession: "",
        Gender: "",
        Blood_Group: "",
        Contact_Number: Number,
        Country: "",
        City: "",
        State: "",
        Address_line1: ""
      });

    firebase
      .database()
      .ref("app/Joining_Requests/" + data)
      .remove();
    this.state.requests.splice(key, 1);
    this.setState({ requests: this.state.requests });
  }
  onPress2(Number, data, key) {
    SendSMS.send(
      {
        body: "You have been rejected to be a member of our community",
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
    firebase
      .database()
      .ref("app/Joining_Requests/" + data)
      .remove();
    this.state.requests.splice(key, 1);
    this.setState({ requests: this.state.requests });
  }
  handlenavigation() {
    alert("navigated");
  }
  goback() {
    this.props.navigation.goBack();
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
          Name: result[1].toString(),
          Uid: data.key
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
              paddingBottom: 20,
              padding: 5
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
              acceptingfunction={() =>
                this.onPress1(val.Number, val.Name, val.Uid, key)
              }
              rejectingfunction={() => this.onPress2(val.Number, val.Uid, key)}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{flex:1, backgroundColor:"yellow"}}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity title="" onPress={this.goback.bind(this)}>
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>User Requests</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            {/* <TouchableOpacity
              title=""
              onPress={this.handlenavigation.bind(this)}
            >
              <Icon name="edit" color="white" size={25} />
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View>
          <Button title="pressss me" onPress={this.onPress1.bind(this)}>
            press me
          </Button>
        </View> */}
        <ScrollView style={{backgroundColor:"#f2f2f2"}}>
          <View
            style={{
              flexWrap: "wrap-reverse",
              flexDirection: "column-reverse",
              backgroundColor: "#f2f2f2"
            }}
          >
            {requestval}
          </View>
        </ScrollView>
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
    fontSize: 22,
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
