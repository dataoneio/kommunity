import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,BackHandler
} from "react-native";
import styles from "./HomeNavigatorStyle";
import { NavigationEvents } from "react-navigation";

const win = Dimensions.get("window");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class HomeNavigator extends React.Component {
  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };
   onblur() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  onfocus() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount()
  {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

  }
  onpressf = text => {
    alert(text);
  };
  render() {
    return (
      <View>
        <NavigationEvents
          onDidFocus={this.onfocus.bind(this)}
          onDidBlur={this.onblur.bind(this)}
        />
        <View style={styles.header}>
          <View />
          <Text style={styles.home}>Home</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
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
                  this.props.navigation.navigate("News");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/news.png")}
                  />
                  <Text style={styles.cardTitle}>News</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => {
                  this.props.navigation.navigate("AddressBook");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/contact.png")}
                  />
                  <Text style={styles.cardTitle}>Address Book</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onpressf("3");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/blood.png")}
                  />
                  <Text style={styles.cardTitle}>Blood Group</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onpressf("4");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/job.png")}
                  />
                  <Text style={styles.cardTitle}>Job</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.onpressf("5");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/feedback.png")}
                  />
                  <Text style={styles.cardTitle}>Feedback</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onpressf("6");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/search.png")}
                  />
                  <Text style={styles.cardTitle}>Search</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
