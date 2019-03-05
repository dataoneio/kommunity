import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import renderIf from "./renderIf";
import { Icon, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./ViewFeedStyle";
import firebase from "../../../Firebase";
import Comment from "../Comment/Comment";
//import { TextInput } from "react-native-paper";
const win = Dimensions.get("window");

export default class ViewFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      CommentsArray: [],
      Addcomment: false
    };
  }
  componentDidMount() {
    var { screenProps } = this.props;

    console.log("did mount of Viewfeed");
    console.log(" logged in user id " + screenProps.user.id);
    console.log("url:---" + screenProps.user.userphotourl);
    const { navigation } = this.props;
    var EventId = navigation.getParam("id", "NO-ID");
    var arr1 = [];
    firebase
      .database()
      .ref("app/Event details/" + EventId + "/Comments")
      .on("child_added", data => {
        console.log("keys" + JSON.stringify(data.val()));

        arr1.push({
          userId: data.val().Id,
          text: data.val().text
        });
        this.setState({ CommentsArray: arr1 });
      });
  }
  Activatecomment() {
    this.setState({ Addcomment: true });
  }
  HideComment() {
    if (this.state.mycomment.trim().length > 0) {
      var { screenProps } = this.props;
      const { navigation } = this.props;
      var EventId = navigation.getParam("id", "NO-ID");
      firebase
        .database()
        .ref("app/Event details/" + EventId + "/Comments")
        .push({
          Id: screenProps.user.id,
          text: this.state.mycomment
        });
    }
    this.setState({ Addcomment: false });
    this.setState({ mycomment: "" });
  }
  render() {
    const { navigation } = this.props;
    //const UserId = navigation.getParam("id", "NO-ID");
    const title = navigation.getParam("Title", " Title-missing ");
    const description = navigation.getParam(
      "description",
      " description missing"
    );
    const imageurl = navigation.getParam("url", "url not found");

    let CommentsArray = this.state.CommentsArray;
    var comments = CommentsArray.map((val, key) => {
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
        <View
          key={key}
          style={{
            padding: 5,
            paddingBottom: 10,
            backgroundColor: "transparent"
            //borderColor: "red",
            //borderRadius: 5,
            //borderWidth: 1
          }}
        >
          <View
            style={{
              padding: 1,
              borderRadius: 5,
              backgroundColor: "transparent"
            }}
          >
            <Comment
              key={key}
              keyval={key}
              val={val}
              name={name}
              profile={profile}
            />
          </View>
        </View>
      );
    });
    return (
      <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 10 }}>
        <ScrollView style={{ paddingBottom: 10 }}>
          <View style={styles.header}>
            <View>
              <TouchableOpacity
                title=""
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>POST</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text />
            </View>
          </View>
          <Text style={styles.title}>
            {JSON.stringify(title).replace(/\"/g, "")}
          </Text>
          <Text style={styles.description}>
            {JSON.stringify(description).replace(/\"/g, "")}
          </Text>
          {renderIf(JSON.stringify(imageurl).replace(/\"/g, "") != "")(
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: JSON.stringify(imageurl).replace(/\"/g, "") }}
                resizeMode="contain"
                style={{
                  width: win.width - 20,
                  height: win.height / 3,
                  paddingLeft: 20,
                  paddingBottom: 10,
                  paddingTop: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </View>
          )}
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "black", fontSize: 18, padding: 10 }}>
              Comments
            </Text>
          </View>

          <View>{comments}</View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton1}
          title="add"
          onPress={this.Activatecomment.bind(this)}
        >
          <Icon
            name="comment-outline"
            type="material-community"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.footer}>
          {renderIf(this.state.Addcomment)(
            <TextInput
              placeholder="Add a comment ..."
              placeholderTextColor="white"
              onChangeText={mycomment => this.setState({ mycomment })}
              value={this.state.mycomment}
              style={{
                padding: 3,
                backgroundColor: "#2f497e",
                color: "white",
                fontSize: 16,
                paddingVertical: 14
              }}
              returnKeyType="done"
              autoFocus={true}
              onSubmitEditing={this.HideComment.bind(this)}
            />
          )}
        </View>
      </View>
    );
  }
}