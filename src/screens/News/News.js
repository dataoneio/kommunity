import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";
import styles from "./NewsStyle";
import AddEvent from "../AddEvent/AddEvent";
const win = Dimensions.get("window");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class NewsScreen extends React.Component {
  onpressf = text => {
    alert(text);
  };
  categorize(txt) {
    // alert(txt);
    this.props.navigation.navigate("Home", { txt: txt });
  }
  logout() {
    AsyncStorage.removeItem("token");
    this.setState({ isAdmin: false }, () => {
      this.props.navigation.navigate("Login");
    });
  }
  render() {
    return (
      <View>
        {/* <View style={styles.header}>
          <Text style={styles.home}>News</Text>
        </View> */}

        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Info");
              }}
            >
              <Icon
                name="info-circle"
                type="font-awesome"
                color="white"
                size={30}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.home}>News</Text>

          <View style={{ paddingTop: 2 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddEvent");
              }}
            >
              <Icon name="plus" type="antdesign" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 100 }}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                padding: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.categorize("All");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/all_news.png")}
                  />
                  <Text style={styles.cardTitle}>All</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("BroadcastedPost")
                }
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/broadcast.png")}
                  />
                  <Text style={styles.cardTitle}>Broadcasted</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Good");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/happy.png")}
                  />
                  <Text style={styles.cardTitle}>Good</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Sad");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/sad.png")}
                  />
                  <Text style={styles.cardTitle}>Sad</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Education");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/education.png")}
                  />
                  <Text style={styles.cardTitle}>Education</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Religion");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/religion.png")}
                  />
                  <Text style={styles.cardTitle}>Religion</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Sports");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/sports.png")}
                  />
                  <Text style={styles.cardTitle}>Sports</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("General");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/general.png")}
                  />
                  <Text style={styles.cardTitle}>General</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Party");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/party.png")}
                  />
                  <Text style={styles.cardTitle}>Party</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Business");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/business.png")}
                  />
                  <Text style={styles.cardTitle}>Business</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Meet-up");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/meetup.png")}
                  />
                  <Text style={styles.cardTitle}>Meet-up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Birthday");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/birthday.png")}
                  />
                  <Text style={styles.cardTitle}>Birthday</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.categorize("Announcement");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/announcement.png")}
                  />
                  <Text style={styles.cardTitle}>Announcement</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
