import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";

import styles from "./FeedStyle";
import renderIf from "../ViewFeed/renderIf";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import firebase from "../../../Firebase";
import Autolink from "react-native-autolink";
import Dialog from "react-native-dialog";
import LinkPreview from "react-native-link-preview";
import RNUrlPreview from "react-native-url-preview";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserImage: "",
      contact_number: "",
      mypost: false,
      dialogVisible: false,
      title: "sample title",
      data: ""
    };
  }
  componentDidMount() {
    this.getTitle();
    var { screenProps } = this.props;
    // console.log("my number----"+this.props.loggedinuser)
    // firebase
    //   .database()
    //   .ref(
    //     "app/" +this.props.comname+"/User/" +
    //       this.props.val.userId
    //   )
    //   .on("value", data => {
    //     name = data.toJSON().Name;
    //     console.log("my number"+data.toJSON().Contact_Number)
    //     this.setState({ username: data.toJSON().Name });
    //     this.setState({ UserImage: data.toJSON().Profile_photo });
    //     this.setState({ contact_number: data.toJSON().Contact_Number }, () => {
    //       if (this.props.loggedinuser === this.state.contact_number) {
    //         this.setState({ mypost: true });
    //       }
    //     });
    //   });
  }

  getTitle() {
    LinkPreview.getPreview("https://www.youtube.com/watch?v=aqz-KE-bpKQ").then(
      data => this.setState({ data })
    );
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    this.props.delete();
    this.setState({ dialogVisible: false });
  };
  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      if (Math.floor(interval) == 1) {
        return interval + " year ago";
      } else return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      if (Math.floor(interval) == 1) {
        return interval + " month ago";
      } else return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      if (Math.floor(interval) == 1) {
        return interval + " day ago";
      } else return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      if (Math.floor(interval) == 1) {
        return interval + " hour ago";
      } else return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      if (Math.floor(interval) == 1) {
        return interval + " minute ago";
      } else return interval + " minutes ago";
    }
    if (Math.floor(seconds) == 0 || Math.floor(seconds) == 1)
      return Math.floor(seconds) + " second ago";
    else return Math.floor(seconds) + " seconds ago";
  }

  render() {
    var d1 = new Date();
    var aDay = 24 * 60 * 60 * 1000;
    //console.log(this.timeSince(new Date(Date.now() - aDay)));
    //console.log(this.timeSince(d1) + "laalla");

    if (this.props.mypost) {
      return (
        <View key={this.props.keyval} style={styles.note}>
          <View>
            <View />

            <TouchableOpacity
              onPress={this.props.viewDetailsMethod}
              onLongPress={this.showDialog}
            >
              <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>Delete Post</Dialog.Title>
                <Dialog.Description>
                  Do you want to delete this post? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Delete" onPress={this.handleDelete} />
              </Dialog.Container>
              <View
                style={{
                  //backgroundColor: "red",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: 10
                }}
              >
                <TouchableOpacity onPress={this.props.testing}>
                  <Image
                    style={styles.ImageContainer1}
                    source={{
                      uri: this.props.profile
                    }}
                  />
                </TouchableOpacity>

                <View style={{ paddingLeft: 5 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "stretch"
                    }}
                  >
                    <View>
                      <Text style={styles.username}>
                        {this.props.name
                         }
                      </Text>
                    </View>
                    <View>
                      {/* {renderIf(this.props.mypost)(
                      <TouchableOpacity title="" onPress={this.props.delete}>
                        <Icon name="delete" color="#676261" size={25} />
                      </TouchableOpacity>
                    )} */}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.date}>
                      {this.timeSince(this.props.val.date)}
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              </View>
              <View>
                <Text style={styles.title}>{this.props.val.title}</Text>
                {/* <Text
                style={styles.description}
                multiline={true}
                numberOfLines={1}
              >
                {this.props.val.description}
              </Text> */}
                <Autolink
                  style={styles.description}
                  multiline={true}
                  numberOfLines={1}
                  text={this.props.val.description}
                />
                <RNUrlPreview
                  style={styles.description}
                  multiline={true}
                  numberOfLines={1}
                  text={this.props.val.description}
                />
              </View>

              {renderIf(this.props.val.url1 != "")(
                <View style={{ alignItems: "center", padding: 10 }}>
                  <Image
                    source={{ uri: this.props.val.url1 }}
                    style={{
                      width: widthPercentageToDP("90%"),
                      height: 250,
                      paddingLeft: 20,
                      paddingBottom: 10,
                      paddingTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "transparent"
                    }}
                  />
                </View>
              )}
              <View style={{ flexDirection: "row" }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View key={this.props.keyval} style={styles.note}>
          {renderIf(this.props.val.userId == "-L_D3IzXaaaXjmQPWk4Q")(
            <View
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                paddingRight: 10,
                paddingTop: 5
              }}
            >
              {/* <Icon
              name="bookmark"
              color="red"
              size={30}
            /> */}
              <Text
                style={{
                  color: "#47d147",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderColor: "#47d147",
                  borderWidth: 2,
                  borderRadius: 5
                }}
              >
                Admin
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={this.props.viewDetailsMethod}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10
              }}
            >
              <TouchableOpacity onPress={this.props.testing}>
                <Image
                  style={styles.ImageContainer1}
                  source={{
                    uri: this.props.profile
                  }}
                />
              </TouchableOpacity>

              <View style={{ paddingLeft: 5 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "stretch"
                  }}
                >
                  <View>
                    <Text style={styles.username}>
                      {this.props.name}
                    </Text>
                  </View>
                  <View>
                    {/* {renderIf(this.props.mypost)(
                        <TouchableOpacity title="" onPress={this.props.delete}>
                          <Icon name="delete" color="#676261" size={25} />
                        </TouchableOpacity>
                      )} */}
                  </View>
                </View>
                <View>
                  <Text style={styles.date}>
                    {this.timeSince(this.props.val.date)}
                  </Text>
                </View>
                {/* </View> */}
              </View>
            </View>
            <View>
              <Text style={styles.title}>{this.props.val.title}</Text>
              {/* <Text
                  style={styles.description}
                  multiline={true}
                  numberOfLines={1}
                >
                  {this.props.val.description}
                </Text> */}
              <Autolink
                style={styles.description}
                multiline={true}
                numberOfLines={1}
                text={this.props.val.description}
              />
              <RNUrlPreview
                style={styles.description}
                multiline={true}
                numberOfLines={1}
                text={this.props.val.description}
              />
            </View>
            {renderIf(this.props.val.url1 != "")(
              <View style={{ alignItems: "center", padding: 10 }}>
                <Image
                  source={{ uri: this.props.val.url1 }}
                  style={{
                    width: widthPercentageToDP("90%"),
                    height: 250,
                    paddingLeft: 20,
                    paddingBottom: 10,
                    paddingTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent"
                  }}
                />
              </View>
            )}
            <View style={{ flexDirection: "row" }} />
          </TouchableOpacity>
        </View>
      );
    }
  }
}
