import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import Feed from "../../components/Feed/Feed";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,RefreshControl
} from "react-native";
import renderIf from "../../components/ViewFeed/renderIf";
import firebase from "../../../Firebase";
import styles from "./MyPostsStyle";
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
      isLoading: true,
      referenceToOldestKey1:"events",
      referenceToLatestKey:"",
      searchResult:[],
      gettingData:false
    };
  }
  componentDidMount() {
    var { screenProps } = this.props;
    this.setState(
      { imageurl: screenProps.user.userphotourl },
      console.log("dedededeee----" + screenProps.user.userphotourl)
    );
    this.getCustomLastKey();

    //this.getDataFromFirebase();
    //console.log("wwww----"+screenProps.user.id)
  }




  getCustomLastKey() {
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details/")
      .orderByKey()
      .limitToFirst(1)
      .on("child_added", snapshot => {
        this.setState({ referenceToLatestKey: snapshot.key }, () => {
          console.log("latest key" + this.state.referenceToLatestKey);
          this.getCustomData();
          // firebase
          //   .database()
          //   .ref("app/" + screenProps.user.CommunityName + "/Event details/")
          //   .orderByChild("UserId/"+this.state.userId)
          //   // .equalTo(this.state.userId)
          //   .limitToLast(1)
          //   .once("child_added", snapshot => {
          //     this.setState({ referenceToOldestKey: snapshot.key }, () => {
          //       console.log("oldest key" + this.state.referenceToOldestKey);
          //     //  this.getCustomData();
          //     });
          //  });
        });
      });
    // firebase
    //   .database()
    //   .ref("app/" + screenProps.user.CommunityName + "/Event details/")
    //   .orderByChild("UserId/" + this.state.userId)
    //   // .equalTo(this.state.userId)
    //   //.limitToLast(1)
    //   .once("value", snapshot => {
    //     this.setState({ referenceToOldestKey1: snapshot.key }, () => {
    //       console.log("oldest key" + this.state.referenceToOldestKey1);
    //       this.getCustomData();
    //     });
    //   });
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
      .endAt(this.state.referenceToOldestKey1)
      .limitToLast(10)
      .once("value")
      .then(snapshot => {
        console.log("aaaaaaaaa"+this.state.referenceToOldestKey1)
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
          referenceToOldestKey1: arrayOfKeys[arrayOfKeys.length - 1]
        });

        for (var i in results) {
          result.push(results[i]);
        }

        for (var i = 0; i < result.length - 1; i++) {
          if (
            result[i].UserId.toString() === screenProps.user.id) {
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

        console.log("qwerty" + this.state.referenceToOldestKey1);
        console.log("qwerty" + this.state.referenceToLatestKey);

        if (this.state.searchResult.length < 3) {
          if (
            this.state.referenceToLatestKey == this.state.referenceToOldestKey1
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
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByChild("UserId")
      .equalTo(screenProps.user.id)
      .on("child_added", data => {
        console.log("aaaaa" + JSON.stringify(data.toJSON()));
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        // for (var i in arr) {
        //   result.push(arr[i]);
        // }

        arr1.push({
          date: arr.Date,//result[2].toString(),
          category: arr.Category,//result[0].toString(),
          description: arr.Description,//result[3].toString(),
          title: arr.Title,//result[6].toString(),
          url1: arr.Image,//result[4].toString(),
          userId: arr.UserId,//result[7].toString(),
          uid: data.key
          // date: //result[2].toString(),
          // category: result[0].toString(),
          // description: result[3].toString(),
          // uid: data.key,
          // title: result[6].toString(),
          // url1: result[4].toString(),
          // userId: result[7].toString()
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
      var { screenProps } = this.props;
      let name = "";
      let profile = "";
      firebase
        .database()
        .ref("app/" + screenProps.user.CommunityName + "/User/" + val.userId)
        .on("value", data => {
          // console.log("----"+data.toJSON().Name)
          name = data.toJSON().Name;
          profile = data.toJSON().Profile_photo;
        });
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
              comname={screenProps.user.CommunityName}
              name={name}
              profile={profile}
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
          {/* <ScrollView
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
            style={{ backgroundColor: "white"}} */}
          {/* > */}
          {/* <ScrollView style={{ padding: 10, backgroundColor: "white" }}> */}
            <View style={{ paddingTop: 20, alignItems: "center" }}>
              <Image
                borderRadius={50}
                style={styles.ImageContainer1}
                source={{
                  uri: imageurl
                }}
                indicator={Progress.Circle}
              />
            </View>

            {/* <View
              style={{
                alignSelf: "center",
                paddingTop: 10,
                backgroundColor: "white"
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  borderRadius={50}
                  style={styles.ImageContainer1}
                  source={{
                    uri: imageurl
                  }}
                  indicator={Progress.Circle}
                />
              </View>
            </View> */}
            <View
              style={{
                paddingTop: 10,
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "stretch"
              }}
            >
              <View style={{ flex: 1, padding: 1 }}>
                <Button
                  color="#f2264f"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("Info")}
                />
              </View>
              <View style={{ flex: 1, padding: 1 }}>
                <Button
                  color="#C60C31"
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("MyPosts")}
                />
              </View>
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
            style={{ backgroundColor: "white"}}
          >
            <View
              style={{
                paddingBottom: 450,
                // flexWrap: "wrap-reverse",
                // flexDirection: "column-reverse",
                backgroundColor: "#dddce2"
              }}
            >
              {renderIf(this.state.isLoading)(
                <View>
                  <Text>Loading.....</Text>
                </View>
              )}

              {MyPostss}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
