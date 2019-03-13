import React, { Component } from "react";

import { Icon } from "react-native-elements";

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
import Joining_Requests from "../../components/JoiningRequests/JoiningRequests";
import firebase from "../../../Firebase";
import SendSMS from "react-native-sms";

export default class UserNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      EventIds: [],
      Comments: []
    };
  }
  componentDidMount() {
    var { screenProps } = this.props;
    console.log(screenProps.user.id + "++++++userid++++");

    this.getDataFromFirebase();

    var arr1 = [];
    let eventid = [];
  }

  handleClick(eid, etitle, edesc, eimage) {
    this.props.navigation.navigate("ViewFeed", {
      id: eid,
      Title: etitle,
      description: edesc,
      url: eimage
    });
  }
  acceptRequest(Number, name, data, key) {
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
      .ref("app/User/" + data)
      .set({
        Name: name,
        Email: "",
        Profile_photo:
          "https://cdn-images-1.medium.com/max/1600/0*WK_vAxJo4O7Kdq3j.png",
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
      .ref("app/User/" + data + "/Business_details")
      .update({
        Name: "",
        Contact_Number: "",
        Type: "",
        Category: "",
        Address_line1: "",
        Address_line2: ""
      });

    firebase
      .database()
      .ref("app/Joining_Requests/" + data)
      .remove();
    this.state.requests.splice(key, 1);
    this.setState({ requests: this.state.requests });
  }
  rejectRequest(Number, data, key) {
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
    this.props.navigation.navigate("Home");
  }
  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    firebase
      .database()
      .ref("app/Joining_Requests")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        for (var i in arr) {
          result.push(arr[i]);
        }

        arr1.push({
          Number: result[0].toString(),
          Name: result[1].toString(),
          Uid: data.key
        });
        this.setState({ requests: arr1 });
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
            }}
          >
            <Joining_Requests
              key={key}
              keyval={key}
              val={val}
              acceptingfunction={() =>
                this.acceptRequest(val.Number, val.Name, val.Uid, key)
              }
              rejectingfunction={() =>
                this.rejectRequest(val.Number, val.Uid, key)
              }
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity title="" onPress={this.goback.bind(this)}>
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>Notifications</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
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

  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  header: {
    backgroundColor: "#2f497e",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
