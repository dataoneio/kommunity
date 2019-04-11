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
import firebase from "../../../Firebase";
import Feed from "../../components/Feed/Feed";
import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
export default class BroadcastedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      eventlist: [],
      isloading: true,
      results: []
    };
  }
  getDataForBroadcast(eventid, arr1) {
    console.log("doneeee");
    firebase
      .database()
      .ref("app/Event details/" + eventid)
      .on("value", data => {
        console.log("eeeeee" + data.toJSON().Date);
        arr1.push({
          date: data.toJSON().Date,
          category: data.toJSON().Category,
          description: data.toJSON().Description,
          uid: data.key,
          title: data.toJSON().Title,
          url1: data.toJSON().Image,
          userId: data.toJSON().UserId
        });
        this.setState({
          results: arr1
        });
        console.log("wwwww" + JSON.stringify(arr1));
        this.setState({ isloading: false });
      });
  }
  viewDetail(uid, title, desc, imgurl) {
    console.log("yoho------");
    this.props.navigation.navigate("ViewFeed", {
      id: uid,
      Title: title,
      description: desc,
      url: imgurl,
      backto: "News"
    });
  }
  testing(uid) {
    //console.log("home it is" + uid);
    this.props.navigation.navigate("UserInfo", {
      EventId: uid,
      screen: "BroadcastedPost"
    });
  }
  componentDidMount() {
    var arr1 = [];
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/BroadcastPost")
      .on(
        "child_added",
        data => {
          console.log("key--" + data.key);
          console.log("gender--" + data.toJSON().gender);
          console.log("city---" + data.toJSON().city);
          console.log("state---" + data.toJSON().state);
          var type = data.toJSON().type;
          if (type == "gender") {
            if (data.toJSON().gender === screenProps.user.gender) {
              console.log("gender");
              // arr1.push({
              //   keys: data.key
              // });
              this.getDataForBroadcast(data.key, arr1);
            }
          } else if (type == "gender&state&city") {
            if (
              data.toJSON().state === screenProps.user.state &&
              data.toJSON().city === screenProps.user.city &&
              data.toJSON().gender === screenProps.user.gender
            ) {
              this.getDataForBroadcast(data.key, arr1);
              console.log("gender&state&city");
              // arr1.push({
              //   keys: data.key
              // });
            }
          } else if (type == "gender&state") {
            if (
              data.toJSON().state === screenProps.user.state &&
              data.toJSON().gender === screenProps.user.gender
            ) {
              console.log("state&gender");
              // arr1.push({
              //   keys: data.key
              // });
              this.getDataForBroadcast(data.key, arr1);
            }
          } else if (type == "state") {
            if (data.toJSON().state === screenProps.user.state) {
              console.log("state");
              // arr1.push({
              //   keys: data.key
              // });
              this.getDataForBroadcast(data.key, arr1);
            }
          } else if (type == "state&city") {
            if (
              data.toJSON().state === screenProps.user.state &&
              data.toJSON().city === screenProps.user.city &&
              data.toJSON().state === screenProps.user.state
            ) {
              console.log("state&city");
              // arr1.push({
              //   keys: data.key
              // });
              this.getDataForBroadcast(data.key, arr1);
            }
          }
          this.setState({ isloading: false });

          //this.setState({ eventlist: arr1 });
          // console.log("arrrrrrr-----" + JSON.stringify(arr1));
          //  arr1.push({
          //  key: data.key
          //  })
        },
        this.setState({ isloading: false })
      );
    //console.log("------"+JSON.stringify(arr1))
  }

  render() {
    if (this.state.isloading) {
      return (
        <View style={{ paddingLeft: 20, paddingTop: 30 }}>
          <ContentLoader height={300}>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
            <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
            <Rect x="0" y="70" rx="5" ry="5" width="400" height="200" />
          </ContentLoader>
          <ContentLoader height={300}>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
            <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
            <Rect x="0" y="70" rx="5" ry="5" width="900" height="200" />
          </ContentLoader>
          <ContentLoader height={300}>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
            <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
            <Rect x="0" y="70" rx="5" ry="5" width="900" height="200" />
          </ContentLoader>
        </View>
      );
    }
    var broadcastPosts = this.state.results.map((val, key) => {
      let name = "";
      let profile = "";
      firebase
        .database()
        .ref("app/User/" + val.userId)
        .on("value", data => {
          name = data.toJSON().Name;
          profile = data.toJSON().Profile_photo;
        });
      return (
        <View key={key} style={{ paddingHorizontal: 5, paddingVertical: 3 }}>
          <View
            style={{
              padding: 2,
              borderRadius: 5,

              backgroundColor: "#DDDCE2"
            }}
          >
            <Feed
              name={name}
              profile={profile}
              key={key}
              keyval={key}
              val={val}
              testing={() => this.testing(val.uid)}
              //deleteMethod={() => this.deleteNote(val.uid, key)}
              viewDetailsMethod={() =>
                this.viewDetail(val.uid, val.title, val.description, val.url1)
              }
              //imageMethod={() => this.imageNote(val.uid, val.url1, key)}
            />
          </View>
        </View>
      );
    });
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.home}>Broadcasted Post</Text>
        </View>
        <View>{broadcastPosts}</View>
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
    textAlign: "center",
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
