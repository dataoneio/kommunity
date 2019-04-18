import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  BackHandler,
  RefreshControl,
  TouchableHighlight,
  Modal,
  Image,
  Dimensions
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Icon } from "react-native-elements";
import firebase from "../../../Firebase";
import Feed from "../../components/Feed/Feed";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import ContentLoader from "react-native-content-loader";
import Drawer from "react-native-circle-drawer";
import { Circle, Rect } from "react-native-svg";
import RNShake from "react-native-shake";
import renderIf from "../../components/ViewFeed/renderIf";
import Dialog from "react-native-dialog";
import styles from "./HomeStyle";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ftitle: "",
      fdescription: "",
      fdate: "",
      feeds: [],
      initialVals: [],
      searchResult: [],
      searchInput: "",
      onFilter: true,
      isLoading: true,
      LoggedInNumber: "",
      refreshing: false,
      drawerview: false,
      UserId: "",
      dialogVisible: false,
      gender: "",
      city: "",
      State: "",
      referenceToOldestKey: "",
      gettingData: false,
      databaseLength: 0
    };

    this.getLastKey = this.getLastKey.bind(this);
    this.getDataFromFirebase = this.getDataFromFirebase.bind(this);
    this.getCustomData = this.getCustomData.bind(this);
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleRed() {
    this.setState({ dialogVisible: false });
  }

  componentDidMount() {
    this.getValueLocally();
    var { screenProps } = this.props;
    const { navigation } = this.props;

    setTimeout(()=>{this.setState({isLoading:false}),console.log("making isloading false")},3000)

    var category = navigation.getParam("txt", "No text");
    if (category == "All") {
      this.setState({ searchInput: category }, () => this.getLastKey());
    } else {
      this.setState({ searchInput: category, onFilter: false }, () =>
        this.getCustomLastKey()
      );
    }
  }

  getLastKey() {
    var { screenProps } = this.props;

    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByKey()
      .limitToLast(1)
      .on("child_added", snapshot => {
        this.setState({ referenceToOldestKey: snapshot.key }, () => {
          this.getDataFromFirebase();
        });
      });
  }

  getCustomLastKey() {
    var { screenProps } = this.props;

    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByChild("Category")
      .equalTo(this.state.searchInput)
      .limitToLast(1)
      .on("child_added", snapshot => {
        this.setState({ referenceToOldestKey: snapshot.key }, () => {
          console.log(this.state.referenceToOldestKey);
          this.getCustomData();
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
      // .orderByChild("Category")
      // .equalTo(this.state.searchInput)
      // .limitToLast(10)
      // .once("value")
      .then(snapshot => {
        console.log(iter);
        iter = iter + 1;
        snapshot.forEach(function(childsnap) {
          // console.log(JSON.stringify(childsnap.val()));
          key1[index1] = childsnap.key;
          index1++;
        });

        arrayOfKeys = Object.keys(snapshot.val())
          .sort()
          .reverse();

        results = arrayOfKeys.map(key => snapshot.val()[key]);
        var result = [];

        console.log(arrayOfKeys[arrayOfKeys.length - 1]);
        this.setState({
          referenceToOldestKey: arrayOfKeys[arrayOfKeys.length - 1]
        });

        console.log("checkpoint1");
        for (var i in results) {
          result.push(results[i]);
        }

        console.log("checkpoint2");
        for (var i = 0; i < result.length - 1; i++) {
          console.log("checkpoint3");
          if (result[i].Category.toString() === this.state.searchInput) {
            console.log("here");
            arr1.push({
              date: result[i].Date.toString(),
              category: result[i].Category.toString(),
              description: result[i].Description.toString(),
              uid: arrayOfKeys[i],
              title: result[i].Title.toString(),
              url1: result[i].Image.toString(),
              userId: result[i].UserId.toString()
            });
            console.log(arr1);
            this.setState({ searchResult: arr1 });
          }
        }

        if (this.state.searchResult.length < 3) {
          this.getCustomData();
        }
        console.log(arr1 + "check check check 1 2 3");
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        this.setState({ gettingData: false });
      })
      .catch(error => {});
  }

  getValueLocally = () => {
    var { screenProps } = this.props;
    AsyncStorage.getItem("token").then(value =>
      this.setState({ getToken: value }, () => {
        screenProps.user.number = this.state.getToken;
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
              screenProps.user.gender = val1.Gender;
              screenProps.user.city = val1.City;
              screenProps.user.state = val1.State;
              console.log(
                "----" +
                  screenProps.user.gender +
                  "-----" +
                  screenProps.user.city +
                  "-----" +
                  screenProps.user.state
              );
              screenProps.user.userphotourl = val1.Profile_photo;
              screenProps.user.id = data.key;
            }
          });
      })
    );
  };

  getDataFromFirebase() {
    var key1 = [];
    let arr1 = this.state.initialVals;
    var index1 = 0;
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .orderByKey()
      .endAt(this.state.referenceToOldestKey)
      .limitToLast(5)
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(childsnap) {
          key1[index1] = childsnap.key;
          index1++;
        });

        let arrayOfKeys = Object.keys(snapshot.val())
          .sort()
          .reverse();

        let results = arrayOfKeys.map(key => snapshot.val()[key]);
        var result = [];

        this.setState({
          referenceToOldestKey: arrayOfKeys[arrayOfKeys.length - 1]
        });

        for (var i in results) {
          result.push(results[i]);
        }

        for (var i = 0; i < result.length - 1; i++) {
          if (result[i].Post_View.toString() == "false") {
            arr1.push({
              date: result[i].Date.toString(),
              category: result[i].Category.toString(),
              description: result[i].Description.toString(),
              uid: arrayOfKeys[i],
              title: result[i].Title.toString(),
              url1: result[i].Image.toString(),
              userId: result[i].UserId.toString()
            });
            this.setState({ initialVals: arr1 });
          }
        }

        console.log(arr1);
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        this.setState({ gettingData: false });
        // Do what you want to do with the data, i.e.
        // append to page or dispatch({ … }) if using redux
      })
      .catch(error => {});
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

  testing(uid) {
    //console.log("home it is" + uid);
    this.props.navigation.navigate("UserInfo", { EventId: uid });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getDataFromFirebase();
    this.setState({ refreshing: false });
  };
  openDrawer() {
    this.setState({ drawerview: true });
  }

  logout() {
    this.setState({ drawerview: false });
    AsyncStorage.removeItem("token");
    this.props.navigation.navigate("Login");
  }
  gotoAboutus() {
    this.setState({ drawerview: false });
    this.props.navigation.navigate("AboutUs");
  }
  gotoReportProblem() {
    this.setState({ drawerview: false });
    this.props.navigation.navigate("ReportProblem");
  }
  gotojoiningRequests() {
    this.setState({ drawerview: false });
    this.props.navigation.navigate("UserJoiningRequests");
  }
  gotoBroadcast() {
    this.setState({ drawerview: false });
    this.props.navigation.navigate("Broadcast");
  }
  render() {
    // console.log(this.state.feeds)
var loading=this.state.isLoading
    var { screenProps } = this.props;
    screenProps.user.screenName = "Home";
    let search =
      this.state.onFilter === true
        ? this.state.initialVals
        : this.state.searchResult;
      if (loading) {
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
        </View>
      );
    }
    if(search.length == 0)
    {
          return(
              <View>
              <View style={styles.header}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack(null);
                    }}
                  >
                    <Icon name="arrow-back" color="white" size={30} />
                  </TouchableOpacity>
                </View>
      
                <Text style={styles.home}>Parkar Samaaj</Text>
      
                <View style={{ paddingTop: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Notification");
                    }}
                  >
                    <Icon name="notifications" color="white" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{padding:10,fontSize:16,fontWeight:"bold",textAlign:"center"}}>No Posts found...!!!</Text>
      
              </View>
            );
        
        
    }
    // if (search.length == 0) {
    //   //this.setState({ isLoading: false });
    //   return (
    //     <View>
    //     <View style={styles.header}>
    //       <View>
    //         <TouchableOpacity
    //           onPress={() => {
    //             this.props.navigation.goBack(null);
    //           }}
    //         >
    //           <Icon name="arrow-back" color="white" size={30} />
    //         </TouchableOpacity>
    //       </View>

    //       <Text style={styles.home}>Parkar Samaaj</Text>

    //       <View style={{ paddingTop: 2 }}>
    //         <TouchableOpacity
    //           onPress={() => {
    //             this.props.navigation.navigate("Notification");
    //           }}
    //         >
    //           <Icon name="notifications" color="white" size={30} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <Text style={{padding:10,fontSize:16,fontWeight:"bold",textAlign:"center"}}>No Post of this category found...!!!</Text>

    //     </View>
    //   );
    // }
    let searchval = search.map((val, key) => {
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
              viewDetailsMethod={() =>
                this.viewDetail(val.uid, val.title, val.description, val.url1)
              }
            />
          </View>
        </View>
      );
    });

    return (
      <View
        style={{
          paddingBottom: 10,
          backgroundColor: "#dddce2",
          flex: 1
        }}
      >
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>

          <Text style={styles.home}>Parkar Samaaj</Text>

          <View style={{ paddingTop: 2 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Notification");
              }}
            >
              <Icon name="notifications" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          onMomentumScrollBegin={() => {
            console.log("outer scroll end");
            if (!this.state.gettingData) {
              console.log("inner scroll end");
              this.setState({ gettingData: true }, () => {
                if (this.state.onFilter) {
                  this.getDataFromFirebase();
                } else {
                  this.getCustomData();
                }
              });
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={{ backgroundColor: "#DDDCE2" }}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.drawerview}
            onRequestClose={() => this.setState({ drawerview: false })}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                onblur={() => this.setState({ drawerview: false })}
                style={{
                  flex: 1,
                  width: 250,
                  backgroundColor: "#C60C31",
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10
                }}
              >
                <View>
                  <View style={styles.drawerHeader}>
                    <Image
                      source={require("../../assets/App_logo.png")}
                      style={styles.logoStyle}
                    />
                    <Text style={styles.drawer}>Parkar Samaaj</Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.gotoAboutus.bind(this)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                  >
                    <Text style={styles.drawerOptions}>About Us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.gotoReportProblem.bind(this)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                  >
                    <Text style={styles.drawerOptions}>Report A Problem</Text>
                  </TouchableOpacity>
                  {renderIf(screenProps.user.number == "917878580099")(
                    <TouchableOpacity
                      onPress={this.gotojoiningRequests.bind(this)}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "white"
                      }}
                    >
                      <Text style={styles.drawerOptions}>User Requests</Text>
                    </TouchableOpacity>
                  )}
                  {renderIf(screenProps.user.number == "917878580099")(
                    <TouchableOpacity
                      onPress={this.gotoBroadcast.bind(this)}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "white"
                      }}
                    >
                      <Text style={styles.drawerOptions}>Broadcast</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={this.showDialog.bind(this)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                  >
                    <Text style={styles.drawerOptions}>Change Theme</Text>
                  </TouchableOpacity>
                  <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Delete Post</Dialog.Title>
                    <Dialog.Description>select a colour</Dialog.Description>
                    <Dialog.Button
                      label="Red"
                      onPress={this.handleRed.bind(this)}
                    />
                    <Dialog.Button
                      label="Yellow"
                      onPress={this.handleRed.bind(this)}
                    />
                  </Dialog.Container>
                  <TouchableOpacity
                    onPress={this.logout.bind(this)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                  >
                    <Text style={styles.drawerOptions}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#676261",
                  opacity: 0.3
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this.setState({ drawerview: false })}
                />
              </View>
            </View>
          </Modal>
          <View style={{ paddingVertical: 8 }}>
            <View
              style={{
                backgroundColor: "#dddce2"
              }}
            >
              {searchval}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
