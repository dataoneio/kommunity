import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Feed from "./Feed";

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
import firebase from "../Firebase";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
//import { timingSafeEqual } from "crypto";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class MyPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      txtvalue: "",
      imageurl: "",
      ftitle: "",
      fdescription: "",
      fdate: "",
      feeds: [],
      initialVals: [],
      searchResult: [],
      searchInput: "",
      onFilter: true,
      isLoading: true
    };
  }
  componentDidMount() {
    this.getData();
    this.getDataFromFirebase();
  }
  goback() {
    const { navigate } = this.props.navigation;
    navigate("Info");
  }
  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
    firebase
      .database()
      .ref("app/Event details")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        console.log("---" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }
        console.log("key--" + key1);
        console.log("---" + result.length);

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),

          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: "hello"
        });

        console.log("date-" + result[2].toString());
        console.log("desc--" + result[3].toString());
        console.log("title-" + result[6].toString());
        console.log("url:" + result[4].toString());
        this.setState({ initialVals: arr1 });
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        console.log("aaawwww" + JSON.stringify(arr1));
        console.log(
          "aaaooooooooooooooooooooooo" + JSON.stringify(this.state.initialVals)
        );
        console.log("aaa" + JSON.stringify(this.state.feeds));
      });
  }
  getData() {
    firebase
      .database()
      .ref("app/User/ID1")
      .once("value", data => {
        var value = data.toJSON();
        console.log("----" + value.Profession);

        // console.log("------" + value.Contact_Number);
        console.log("heheheh----" + JSON.stringify(value));
        this.setState({ Name: value.Name });
        this.setState({ txtvalue: value.Email });
        this.setState({ imageurl: value.Profile_photo });
        this.setState({ profession: value.Profession });
        this.setState({ mobileNo: value.Contact_Number });
        console.log("----" + value.Profession);
        console.log("-----gegeggeg" + this.state.Gender);
        this.setState({ Gender: value.Gender });
        this.setState({ BloodGroup: value.Blood_Group });
        // console.log("eeeeee-" + value.Profile_photo);
        // console.log("image---" + this.state.imageurl);
        // console.log("iiii--" + this.state.Name);
        // console.log("---------" + this.state.txtvalue);
        // console;
      });
    firebase
      .database()
      .ref("app/User/ID1/Business_details")
      .once("value", data => {
        var bval = data.toJSON();
        this.setState({ BusinessCategory: bval.Category });
        this.setState({ BusinessName: bval.Name });
        this.setState({ BusinessMobileNo: bval.Contact_Number });
        this.setState({ Type: bval.Type });
        console.log("hehheheheheh----" + this.state.BusinessMobileNo);
      });
  }
  render() {
    let searchval = this.state.initialVals.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: "white",
              backgroundColor: "#1B2936"
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              //deleteMethod={() => this.deleteNote(val.uid, key)}
              //editMethod={() => this.editNote(val.uid, val.note, val.url1,val.utitleval)}
              //imageMethod={() => this.imageNote(val.uid, val.url1, key)}
            />
          </View>
        </View>
      );
    });
    return (
      <View>
        <View>
          <View style={styles.header}>
            <View>
              <TouchableOpacity title="" onPress={this.goback.bind(this)}>
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>My Posts</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                title=""
                // onPress={this.handlenavigation.bind(this)}
              >
                <Icon name="edit" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{ padding: 10, backgroundColor: "#1B2936" }}>
            <View
              style={{
                alignSelf: "center",
                paddingTop: 20,
                backgroundColor: "#1B2936"
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  borderRadius={50}
                  style={styles.ImageContainer1}
                  source={{
                    uri: this.state.imageurl
                  }}
                  indicator={Progress.Circle}
                />

                {/* <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={{ fontFamily: "lucida grande" }}>
                    {" "}
                    Edit Photo{" "}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                backgroundColor: "#1B2936",
                flexDirection: "row",
                alignItems: "stretch"
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  color="red"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("Info")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("MyPosts")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingBottom:500,
            flexWrap: "wrap-reverse",
            flexDirection: "column-reverse",
            backgroundColor: "#1B2936"
          }}
        >
          <ScrollView style={{ backgroundColor: "1B2936" }}>
            {searchval}
          </ScrollView>
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
  ImageContainer1: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden"
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
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
