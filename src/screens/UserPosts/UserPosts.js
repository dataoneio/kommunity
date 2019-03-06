import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Feed from "../../components/Feed/Feed";
import styles from "./UserPostsStyle";
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
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
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
    const { navigation } = this.props;
    var userId = navigation.getParam("UserId", "No User found");
    var imageurl = navigation.getParam("imageurl", "No User found");
    console.log("hellop1" + userId);
    this.getDataFromFirebase(userId);
    this.setState({ imageurl: imageurl });
  }

  viewDetail(uid, title, desc, imgurl) {
    console.log("yoho------");
    this.props.navigation.navigate("ViewFeed", {
      id: uid,
      Title: title,
      description: desc,
      url: imgurl
    });
  }
  getDataFromFirebase(userId) {
    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
    firebase
      .database()
      .ref("app/Event details")
      .orderByChild("UserId")
      .equalTo(userId)
      .on("child_added", data => {
        console.log("aaaaa" + JSON.stringify(data.toJSON()));
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();

        for (var i in arr) {
          result.push(arr[i]);
        }

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),

          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: result[7].toString()
        });

        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
      });
  }

  render() {
    let MyPostss = this.state.feeds.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              viewDetailsMethod={() =>
                this.viewDetail(val.uid, val.title, val.description, val.url1)
              }
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
              <TouchableOpacity
                title=""
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              >
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>User Posts</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            />
          </View>
          <ScrollView style={{ padding: 10, backgroundColor: "white" }}>
            <View
              style={{
                alignSelf: "center",
                paddingTop: 20,
                backgroundColor: "white"
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
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "stretch"
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  color="#456097"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("UserInfo")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color="#2f497e"
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("UserPosts")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingBottom: 500,
            flexWrap: "wrap-reverse",
            flexDirection: "column-reverse",
            backgroundColor: "#dddce2"
          }}
        >
          <ScrollView style={{ backgroundColor: "#dddce2" }}>
            {MyPostss}
          </ScrollView>
        </View>
      </View>
    );
  }
}
