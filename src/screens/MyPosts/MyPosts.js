import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import Feed from "../../components/Feed/Feed";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import firebase from "../../../Firebase";
import styles from "./MyPostsStyle"
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
      searchInput: "",
      onFilter: true,
      isLoading: true
    };
  }
  componentDidMount() {
    var { screenProps } = this.props;
    this.setState(
      { imageurl: screenProps.user.userphotourl },
      console.log("dedededeee----" + screenProps.user.userphotourl)
    );

    this.getDataFromFirebase();
    //console.log("wwww----"+screenProps.user.id)
  }
  goback() {
    const { navigate } = this.props.navigation;
    navigate("Info");
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
  getDataFromFirebase() {
    var { screenProps } = this.props;

    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
    firebase
      .database()
      .ref("app/Event details")
      .orderByChild("UserId")
      .equalTo(screenProps.user.id)
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
  delete(uid, key) {
    //alert("deleted");
    firebase
      .database()
      .ref("app/Event details/" + uid)
      .remove();

    this.state.feeds.splice(key, 1);
    this.setState({ feeds: this.state.feeds });
  }
  render() {
    const { navigation } = this.props;
    const imageurl = navigation.getParam("imageurl", "no url");
    let MyPostss = this.state.feeds.map((val, key) => {
      return (
        <View key={key} style={{ paddingHorizontal: 5, paddingVertical: 3 }}>
          <View
            style={{
              flex: 1,
              padding: 1,
              borderRadius: 5
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              mypost="true"
              delete={() => this.delete(val.uid, key)}
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
            />
          </View>
          <View style={{paddingTop:20,alignItems:"center" }}>
                <Image
                  borderRadius={50}
                  style={styles.ImageContainer1}
                  source={{
                    uri:imageurl
                  }}
                  indicator={Progress.Circle}
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
              {/* <View style={{ justifyContent: "center" }}>
                <Image
                  borderRadius={50}
                  style={styles.ImageContainer1}
                  source={{
                    uri: imageurl
                  }}
                  indicator={Progress.Circle}
                />
              </View> */}
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
                  color="#f2264f"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("Info")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color="#C60C31"
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("MyPosts")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <ScrollView
          style={{
            backgroundColor: "#dddce2"
          }}
        >
          <View
            style={{
              paddingBottom: 150,
              flexWrap: "wrap-reverse",
              flexDirection: "column-reverse",
              backgroundColor: "#dddce2"
            }}
          >
            {MyPostss}
          </View>
        </ScrollView>
      </View>
    );
  }
}
