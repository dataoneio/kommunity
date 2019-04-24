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
  Button,
  TextInput,RefreshControl
} from "react-native";
// import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
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
      isLoading: true,
      gettingData: false,
      userId: "",
      referenceToLatestKey:"",
      referenceToOldestKey:""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    var { screenProps } = this.props;
    var userId = navigation.getParam("UserId", "No User found");
    var imageurl = navigation.getParam("imageurl", "No User found");
    this.setState({ imageurl: imageurl, userId: userId }, () => {
      // firebase
      //   .database()
      //   .ref("app/" + screenProps.user.CommunityName + "/Event details")
      //   .orderByKey()
      //   .limitToFirst(1)
      //   .on("child_added", snapshot => {
      //     this.setState({ referenceToLatestKey: snapshot.key }, () => {
      //       console.log("latest key" + this.state.referenceToLatestKey);
            this.getCustomLastKey();
        //  });
       // });
    });
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

  // getDataFromFirebase(userId) {
  //   var { screenProps } = this.props;

  //   let arr1 = [];
  //   var d = new Date();
  //   console.log("date===" + d);
  //   firebase
  //     .database()
  //     .ref("app/" + screenProps.user.CommunityName + "/Event details")
  //     .orderByChild("UserId")
  //     .equalTo(userId)
  //     .on("child_added", data => {
  //       console.log("aaaaa" + JSON.stringify(data.toJSON()));
  //       var result = [];
  //       var key1 = [];
  //       key1.push(data.key);
  //       let arr = data.toJSON();

  //       for (var i in arr) {
  //         result.push(arr[i]);
  //       }

  //       arr1.push({
  //         date: result[2].toString(),
  //         category: result[0].toString(),

  //         description: result[3].toString(),
  //         uid: data.key,
  //         title: result[6].toString(),
  //         url1: result[4].toString(),
  //         userId: result[7].toString()
  //       });

  //       this.setState({ feeds: arr1 });
  //       this.setState({ isLoading: false });
  //     });
  // }

  // getCustomLastKey() {
  //   let localArr = [];
  //   console.log("getCustomLastKey called");
  // 	var { screenProps } = this.props;
  // 	firebase
  // 		.database()
  // 		.ref("app/" + screenProps.user.CommunityName + "/Event details")
  //     //.orderByChild("UserId/"+this.state.userId)
  //     .orderByKey()
  //     .limitToFirst(1)
  // 		.on("child_added", snapshot => {
  //       console.log("aaaaaaaaa"+snapshot.key)
  //   });
  // }

  getCustomLastKey() {
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByKey()
      .limitToFirst(1)
      .on("child_added", snapshot => {
        this.setState({ referenceToLatestKey: snapshot.key }, () => {
          console.log("latest key" + this.state.referenceToLatestKey);
          firebase
            .database()
            .ref("app/" + screenProps.user.CommunityName + "/Event details")
            .orderByChild("UserId")
            .equalTo(this.state.userId)
            .limitToLast(1)
            .on("child_added", snapshot => {
              this.setState({ referenceToOldestKey: snapshot.key }, () => {
                console.log("oldest key" + this.state.referenceToOldestKey);
                this.getCustomData();
              });
            });
        });
      });
  }

  getCustomData() {
    let arr1 = this.state.searchResult;
    let key1 = [];
    var index1 = 0;
    let arrayOfKeys = [];
    let results = [];
    let iter = 0;
    const { navigation } = this.props;
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByKey()
      .endAt(this.state.referenceToOldestKey)
      .limitToLast(10)
      .once("value")
      .then(snapshot => {
        console.log(iter);
        iter = iter + 1;
        snapshot.forEach(function(childsnap) {
          key1[index1] = childsnap.key;
          index1++;
        });

        arrayOfKeys = Object.keys(snapshot.val())
          .sort()
          .reverse();

        console.log(arrayOfKeys);

        results = arrayOfKeys.map(key => snapshot.val()[key]);
        var result = [];

        this.setState({
          referenceToOldestKey: arrayOfKeys[arrayOfKeys.length - 1]
        });

        for (var i in results) {
          result.push(results[i]);
        }

        for (var i = 0; i < result.length - 1; i++) {
          if (result[i].UserId.toString() === this.state.userId && result[i].Post_View.toString() == "false") {
            arr1.push({
              date: result[i].Date.toString(),
              category: result[i].Category.toString(),
              description: result[i].Description.toString(),
              uid: arrayOfKeys[i],
              title: result[i].Title.toString(),
              url1: result[i].Image.toString(),
              userId: result[i].UserId.toString()
            });
            this.setState({ searchResult: arr1 });
          }
        }

        console.log("qwerty" + this.state.referenceToOldestKey);
        console.log("qwerty" + this.state.referenceToLatestKey);

        if (this.state.searchResult.length < 3) {
          if (
            this.state.referenceToLatestKey == this.state.referenceToOldestKey
          ) {
            console.log("same end it is ");
            return;
          } else {
            console.log("callback");
            this.getCustomData();
          }
        }

        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        this.setState({ gettingData: false });
      })
      .catch(error => {});
  }

  // getCustomData() {
  //   let arr1 = this.state.feeds;
  //   let key1 = [];
  //   var index1 = 0;
  //   let arrayOfKeys = [];
  //   let results = [];
  //   let iter = 0;
  //   const { navigation } = this.props;
  //   var { screenProps } = this.props;
  //   firebase
  //     .database()
  //     .ref("app/" + screenProps.user.CommunityName + "/Event details")
  //     .orderByKey()
  //     .endAt(this.state.referenceToOldestKey)
  //     .limitToLast(10)
  //     .once("value")
  //     .then(snapshot => {
  //       snapshot.forEach(function(childsnap) {
  //         key1[index1] = childsnap.key;
  //         index1++;
  //       });

  //       arrayOfKeys = Object.keys(snapshot.val()).sort();

  //       results = arrayOfKeys.map(key => snapshot.val()[key]);
  //       var result = [];

  //       this.setState(
  //         {
  //           referenceToOldestKey: arrayOfKeys[0]
  //         },
  //         () => {
  //           console.log(arrayOfKeys);
  // console.log(this.state.referenceToLatestKey);
  // console.log(this.state.referenceToOldestKey);
  // if (
  // 	this.state.referenceToLatestKey ===
  // 	this.state.referenceToOldestKey
  // ) {
  // 	return;
  // } else {
  //   console.log("callback");
  // 	this.getCustomData();
  // }

  // for (var i in results) {
  // 	result.push(results[i]);
  // }

  // for (var i = 0; i < result.length - 1; i++) {
  // 	if (
  // 		result[i].UserId.toString() ===
  // 		this.state.userId
  // 	) {
  // 		arr1.push({
  // 			date: result[i].Date.toString(),
  // 			category: result[i].Category.toString(),
  // 			description: result[
  // 				i
  // 			].Description.toString(),
  // 			uid: arrayOfKeys[i],
  // 			title: result[i].Title.toString(),
  // 			url1: result[i].Image.toString(),
  // 			userId: result[i].UserId.toString()
  // 		});
  // 		this.setState({ feeds: arr1 });
  // 	}
  // }

  // if (this.state.feeds.length < 3) {
  //   if (
  //     this.state.referenceToLatestKey ===
  //     this.state.referenceToOldestKey
  //   ) {
  //     return;
  //   } else {
  //     console.log("callback");
  //     this.getCustomData();
  //   }
  // }
  //         }
  //       );

  //       // this.setState({ isLoading: false });
  //       // this.setState({ gettingData: false });
  //     })
  //     .catch(error => {});
  // }

  render() {
    let MyPostss = this.state.searchResult.map((val, key) => {
      var { screenProps } = this.props;
      let name = "";
      let profile = "";
      firebase
        .database()
        .ref("app/" + screenProps.user.CommunityName + "/User/" + val.userId)
        .on("value", data => {
          name = data.toJSON().Name;
          profile = data.toJSON().Profile_photo;
        });
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5
            }}
          >
            <Feed
              comname={screenProps.user.CommunityName}
              name={name}
              profile={profile}
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

          <ScrollView
            onMomentumScrollBegin={() => {
              console.log("outer scroll end");
              if (!this.state.gettingData) {
                console.log("inner scroll end");
                this.setState({ gettingData: true }, () => {
                  this.getCustomData();
                });
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={{ backgroundColor: "white",padding:10 }}
          >
          {/* <ScrollView style={{ padding: 10, backgroundColor: "white" }}> */}
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
                  color="#f2264f"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("UserInfo")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color="#C60C31"
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("UserPosts")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <ScrollView
          onMomentumScrollBegin={() => {
            console.log("outer scroll end");
            if (!this.state.gettingData) {
              console.log("inner scroll end");
              this.setState({ gettingData: true }, () => {
                this.getCustomData();
              });
            }
          }}
          style={{ backgroundColor: "#dddce2" }}
        >
          <View
            style={{
              paddingBottom: 250,
              // flexWrap: "wrap-reverse",
              // flexDirection: "column-reverse",
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
