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
import { Card } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import firebase from "../../../Firebase";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserImage: ""
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("app/User/" + this.props.val.userId)
      .on("value", data => {
        name = data.toJSON().Name;
        this.setState({ username: data.toJSON().Name });
        this.setState({ UserImage: data.toJSON().Profile_photo });
      });
  }

  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  render() {
    //  console.log(this.state.username + "===========================");
    // if (this.props.val.url1 == "") {
    //   return (
    //     <View key={this.props.keyval} style={styles.note}>
    //       <View>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             justifyContent: "flex-start",
    //             padding: 10
    //           }}
    //         >
    //           <TouchableOpacity onPress={this.props.testing}>
    //             <Image
    //               style={styles.ImageContainer1}
    //               source={{
    //                 uri: this.props.profile
    //                   ? this.props.profile
    //                   : this.state.UserImage
    //               }}
    //             />
    //           </TouchableOpacity>
    //           <TouchableOpacity onPress={this.props.viewDetailsMethod}>
    //             <View style={{ paddingLeft: 20 }}>
    //               <View
    //                 style={{
    //                   flexDirection: "row",
    //                   justifyContent: "space-between"
    //                 }}
    //               >
    //                 <View
    //                   style={{
    //                     alignSelf: "flex-start"
    //                   }}
    //                 >
    //                   <Text style={styles.username}>
    //                     {this.props.name
    //                       ? this.props.name
    //                       : this.state.username}
    //                   </Text>
    //                 </View>
    //                 <View style={{ alignSelf: "flex-end" }}>
    //                   <Text style={styles.date}>{this.props.val.date}</Text>
    //                 </View>
    //               </View>
    //               <View>
    //                 <Text style={styles.title}>{this.props.val.title}</Text>
    //               </View>
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //         <View>
    //           <Text style={styles.description} multiline={false}>
    //             {this.props.val.description}
    //           </Text>
    //         </View>
    //         <View style={{ alignItems: "center" }} />
    //       </View>
    //     </View>
    //   );
    // } else
    var d1 = new Date();
    var aDay = 24 * 60 * 60 * 1000;
    console.log(this.timeSince(new Date(Date.now() - aDay)));
    console.log(this.timeSince(d1) + "laalla");

    return (
      <View key={this.props.keyval} style={styles.note}>
        <View>
          <View />
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
                      ? this.props.profile
                      : this.state.UserImage
                  }}
                />
              </TouchableOpacity>
              <View style={{ paddingLeft: 5 }}>
                {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly"
                    }}
                  > */}
                <Text style={styles.username}>
                  {this.props.name ? this.props.name : this.state.username}
                </Text>
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
              <Text
                style={styles.description}
                multiline={true}
                numberOfLines={1}
              >
                {this.props.val.description}
              </Text>
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
  }
}
