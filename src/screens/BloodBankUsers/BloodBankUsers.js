import React, { Component } from "react";

import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import firebase from "../../../Firebase"
export default class BloodBankUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    var bloodgroup = navigation.getParam("txt", "not");
    var city = navigation.getParam("city", "no");
    this.setState({ bloodgroup: bloodgroup, city: city }, () => {
      if (this.state.bloodgroup != "") {
        // alert(this.state.bloodgroup + "jellos");
        this.setState(
          { flag: true, bloodgroup: bloodgroup, city: city },
          () => {
            // this.getDataFromFirebase();
            this.getUserDataFromFirebase();
          }
        );

        // this.setState({ bloodgroup: bloodgroup }, () => {
        //   this.searchByUser1();
        // });
      }
    });

    // this.getDataFromFirebase();
    // this.getUserDataFromFirebase();
  }
  getUserDataFromFirebase() {
    let arr1 = [];
    var d = new Date();

    firebase
      .database()
      .ref("app/User").orderByChild("Blood_Group").equalTo(this.state.bloodgroup)
      .on("child_added", data => {
        
        arr1.push({
          name: data.toJSON().Name,
          gender: data.toJSON().Gender,
          Profile_image: data.toJSON().Profile_photo,
          userId: data.key,
          city: data.toJSON().City
        });
        //console.log("blooddddd"+data.toJSON().Blood_Group)
        // if (this.state.flag) {
        //   this.setState({ UserArray: arr3 }, () => {
        //     this.searchByUser1();
        //   });
        // } else {
        //   this.setState({ UserArray: arr3 });
        // }
        // console.log("aaawwww" + JSON.stringify(arr3));

        // console.log("aaa" + JSON.stringify(this.state.UserArray));
      });
  }
  searchByUser1() {
    // alert(this.state.UserArray);
    //console.log("BLOOOOOOOOOOOOOOOOOD" + this.state.bloodgroup);
    var arr4 = this.state.UserArray;
    var result1 = arr4.filter(search => {
      let r1 = search.Blood_Group.toUpperCase();

      let st1 = this.state.bloodgroup.toUpperCase();
      if (r1.includes(st1)) {
        return true;
      }
    });
    if (this.state.city != "") {
      var result2 = result1.filter(search => {
        let r1 = search.City.toUpperCase();
        let st1 = this.state.city.toUpperCase();
        if (r1.includes(st1)) {
          return true;
        }
      });
      this.setState({ searchResult1: result2 });
    } else {
      this.setState({ searchResult1: result1 });
    }

    console.log("result1" + JSON.stringify(result1));
  }

  render() {
    return (
      <View>
        <Text>USersssss</Text>
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
