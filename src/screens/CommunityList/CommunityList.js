import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  TextInput,
  Image,
  BackHandler,
  AsyncStorage
} from "react-native";
import firebase from "../../../Firebase";

// import { TextInput } from "react-native-paper";
const win = Dimensions.get("window");
export default class CommunityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      height: 40,
      CommunityArray: []
    };
  }

  handleBackPress = () => {
    console.log("removed");
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidMount() {
    var arr1 = [];
    firebase
      .database()
      .ref("app")
      .on("child_added", data => {
        if (data.toJSON().Logo != undefined) {
          // console.log("qqqqqqq"+data.toJSON().Logo)
          arr1.push({
            Name: data.key,
            Logo: data.toJSON().Logo
          });
          console.log("wwww" + JSON.stringify(arr1));
          this.setState({ CommunityArray: arr1 }, () => {
            console.log("-----" + JSON.stringify(arr1));
          });
        }
        //console.log("keys----" + data.toJSON().Logo);
      });
  }

  render() {
    const { height } = this.state;
    var comList = this.state.CommunityArray.map((val, key) => {
      return (
        <View key={key}>
          <TouchableOpacity
            style={{ marginHorizontal: 5 }}
            onPress={() => {
              BackHandler.removeEventListener(
                "hardwareBackPress",
                this.handleBackPress
              );
              AsyncStorage.setItem("CommunityName", val.Name);
              this.props.navigation.navigate("Login", {
                CommunityName: val.Name
              });
            }}
          >
            <View style={styles.card}>
              <Image
                resizeMode="contain"
                style={styles.Image}
                source={{ uri: val.Logo }}
              />
              <Text style={styles.cardTitle}>{val.Name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View>
        {/* <View
          style={{
            backgroundColor: "#f2f2f2",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              BackHandler.removeEventListener(
                "hardwareBackPress",
                this.handleBackPress
              );
              AsyncStorage.setItem("CommunityName", "parkar");
              this.props.navigation.navigate("Login", {
                CommunityName: "parkar"
              });
            }}
          >
            <View style={styles.card}>
              <Image
                resizeMode="contain"
                style={styles.Image}
                source={require("../../assets/App_logo.png")}
              />
              <Text style={styles.cardTitle}>parkar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              BackHandler.removeEventListener(
                "hardwareBackPress",
                this.handleBackPress
              );
              AsyncStorage.setItem("CommunityName", "MyCom");
              this.props.navigation.navigate("Login", {
                CommunityName: "MyCom"
              });
            }}
          >
            <View style={styles.card}>
              <Image
                resizeMode="contain"
                style={styles.Image}
                source={require("../../assets/SplashLogo.png")}
              />
              <Text style={styles.cardTitle}>MyCom</Text>
            </View>
          </TouchableOpacity>
          
        </View> */}
        <View
          style={{
            backgroundColor: "#f2f2f2",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 5
          }}
        >
          {comList}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: "lucida grande",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold"
  },
  card: {
    marginVertical: 5,
    width: win.width / 2 - 20,
    backgroundColor: "white",
    padding: 5,
    borderColor: "#d9d9d9",
    borderWidth: 0,
    borderRadius: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1.0
  },

  Image: {
    padding: 1,
    width: win.width / 4,
    height: win.height / 4.8,
    alignSelf: "center"
  }
});
