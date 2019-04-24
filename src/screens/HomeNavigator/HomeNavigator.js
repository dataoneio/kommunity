import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  AsyncStorage
} from "react-native";
import styles from "./HomeNavigatorStyle";
import { Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Dialog from "react-native-dialog";
import renderIf from "../../components/ViewFeed/renderIf";
import firebase from "../../../Firebase";

const win = Dimensions.get("window");
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class HomeNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      isAdmin: "false",
      getToken: ""
    };
  }
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
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  onpressf = text => {
    alert(text);
  };
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

  logout() {
    AsyncStorage.removeItem("token");
    this.setState({ isAdmin: false }, () => {
      this.props.navigation.navigate("CommunityList");
    });
  }
  getAdminsfromfirebase() {
    let arr1 = [];
    var d = new Date();
    //var eventid="";
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Admins")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        for (var i in arr) {
          result.push(arr[i]);
        }
        arr1.push(result[1].toString());
        console.log("Admins are " + JSON.stringify(arr1));
        this.setState({ Admins: arr1 }, () => {
          this.checkAdmin();
        });
        this.setState({ isLoading: false });
      });
  }
  checkAdmin() {
    var { screenProps } = this.props;
    console.log("CHCEK ADMINNNNN" + screenProps.user.number);
    var a = JSON.stringify(this.state.getToken);
    console.log("a" + a);
    for (let i = 0; i < this.state.Admins.length; i++) {
      if (JSON.stringify(this.state.Admins[i]) == a) {
        //console.log("true");
        this.setState({ isAdmin: true });
        return true;
      } else {
        this.setState({ isAdmin: false });
      }
      console.log(
        JSON.stringify(this.state.Admins[i]) + " these are for loop admins"
      );
    }
  }

  componentDidMount() {
    var { screenProps } = this.props;
    AsyncStorage.getItem("CommunityName").then(value => {
      (screenProps.user.CommunityName = value),
        console.log("cccccccccccc-------" + value);
    });
    // console.log("comm name " + screenProps.user.CommunityName);

    AsyncStorage.getItem("token").then(value =>
      this.setState({ getToken: value }, () => {
        screenProps.user.number = this.state.getToken;
        this.getAdminsfromfirebase();
        console.log("comm name " + screenProps.user.number);
        firebase
          .database()
          .ref("app/" + screenProps.user.CommunityName + "/User")
          .orderByChild("Contact_Number")
          .equalTo(this.state.getToken)
          .on("child_added", data => {
            val1 = data.val();
            console.log("hehehehehehheheheheh");
            if (data.exists()) {
              this.setState({ gender: val1.Gender });
              this.setState({ State: val1.State });
              this.setState({ city: val1.City });
              // console.log(
              //   "yoyooo---" +
              //     val1.Gender +
              //     "------" +
              //     val1.City +
              //     "-------" +
              //     val1.State
              // );
              screenProps.user.id=data.key
              screenProps.user.gender = val1.Gender;
              screenProps.user.city = val1.City;
              screenProps.user.state = val1.State;
              console.log(
                "----" +
                  screenProps.user.gender +
                  "-----" +
                  screenProps.user.city +
                  "-----" +
                  screenProps.user.state+"--------"+screenProps.user.id
              );
              screenProps.user.userphotourl = val1.Profile_photo;
              screenProps.user.id = data.key;
            }
          });
      })
    );

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  // componentWillUnmount() {
  //   this.setState({ isAdmin: false });
  // }

  render() {
    var { screenProps } = this.props;

    return (
      <View>
        <NavigationEvents
          onDidFocus={this.onfocus.bind(this)}
          onDidBlur={this.onblur.bind(this)}
        />
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

          <Text style={styles.home}>Home</Text>

          <View style={{ paddingTop: 2 }}>
            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}
            >
              <Icon
                name="power-off"
                type="font-awesome"
                color="white"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 100, backgroundColor: "#f2f2f2" }}>
          <ScrollView>
            <View
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
                  this.props.navigation.navigate("BloodBook");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/blood.png")}
                  />
                  <Text style={styles.cardTitle}>Blood Book</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Matrimonial");
                }}
              >
                <View style={styles.card}>
                  <Image
                    resizeMode="contain"
                    style={styles.Image}
                    source={require("../../assets/matrimonial.png")}
                  />
                  <Text style={styles.cardTitle}>Matrimonial</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Home", { txt: "Job" });
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
                  this.props.navigation.navigate("Search");
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ReportProblem");
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
              {console.log("Isadmin state" + this.state.isAdmin)}
              {renderIf(this.state.isAdmin)(
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("UserJoiningRequests");
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      resizeMode="contain"
                      style={styles.Image}
                      source={require("../../assets/add_user.png")}
                    />
                    <Text style={styles.cardTitle}>User Requests</Text>
                  </View>
                </TouchableOpacity>
              )}
              {renderIf(this.state.isAdmin)(
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Broadcast");
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      resizeMode="contain"
                      style={styles.Image}
                      source={require("../../assets/broadcast.png")}
                    />
                    <Text style={styles.cardTitle}>Broadcast</Text>
                  </View>
                </TouchableOpacity>
              )}
               {renderIf(screenProps.user.number == "919016211300")(
                <TouchableOpacity
                  onPress={() => {
                    console.log("clicked")
                    this.props.navigation.navigate("AddCommunity");
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      resizeMode="contain"
                      style={styles.Image}
                      source={require("../../assets/group.png")}
                    />
                    <Text style={styles.cardTitle}>Add New Community</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
