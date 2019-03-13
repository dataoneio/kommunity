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
//import { Button } from "native-base";
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
      UserId: ""
    };
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };

  onblur() {
    console.log("blur");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  onfocus() {
    console.log("focus");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidMount() {
    //this.setValueLocally();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.getValueLocally();
    var { screenProps } = this.props;
    console.log("Did mount");
    const { navigation } = this.props;
    var loggedinnumber = navigation.getParam("LoggedInNumber", "no-number");

    this.setState({ LoggedInNumber: loggedinnumber });
    this.getDataFromFirebase();
  }
  componentWillMount() {
    RNShake.addEventListener("ShakeEvent", () => {
      alert("shaked");
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener("ShakeEvent");
  }

  getValueLocally = () => {
    var { screenProps } = this.props;

    AsyncStorage.getItem("token").then(value =>
      this.setState({ getToken: value }, () => {
        console.log("--inside it--" + this.state.getToken);
        screenProps.user.number = this.state.getToken;
        console.log("-------------------")

        firebase
          .database()
          .ref("app/User")
          .orderByChild("Contact_Number")
          .equalTo(this.state.getToken)
          .on("child_added", data => {
            val1 = data.val();
            console.log("hehehehehehheheheheh")
            if (data.exists()) {
              screenProps.user.userphotourl = val1.Profile_photo;
              screenProps.user.id = data.key;
              console.log(data.key + "datakey");
              console.log(screenProps.user.id + "----");
            }
          });
      })
    );
    console.log(screenProps.user.id + "++++");
  };

  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    // console.log("date===" + d);
    firebase
      .database()
      .ref("app/Event details")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        for (var i in arr) {
          result.push(arr[i]);
        }
        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),
          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: result[7].toString()
        });
        this.setState({ initialVals: arr1 });
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
      });
  }
  onpress = txt => {
    this.setState({
      onFilter: false
    });
    if (txt == "All") {
      // console.log("allPosted........................");
      this.setState({ searchResult: this.state.initialVals });
    } else {
      // console.log("oooo" + txt);
      this.setState({ searchInput: txt }, () => this.searchByPost());
    }
  };
  searchByPost() {
    // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz" + this.state.searchInput);
    var arr2 = this.state.initialVals;
    // console.log("lolololololololol" + JSON.stringify(arr2));
    var result = arr2.filter(search => {
      let v1 = search.description.toUpperCase();
      let v2 = search.title.toUpperCase();
      let v3 = search.category.toUpperCase();
      let s1 = this.state.searchInput.toUpperCase();
      if (v3.includes(s1)) {
        return v1;
      }
    });
    this.setState({ searchResult: result });
    console.log("result" + JSON.stringify(result));
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
  render() {
    if (this.state.isLoading) {
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

    var { screenProps } = this.props;
    screenProps.user.screenName = "Home";
    let search =
      this.state.onFilter === true
        ? this.state.initialVals
        : this.state.searchResult;
    let searchval = search.map((val, key) => {
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
      <View style={{ paddingBottom: 10, backgroundColor: "#dddce2", flex: 1 }}>
        <NavigationEvents
          onDidFocus={this.onfocus.bind(this)}
          onDidBlur={this.onblur.bind(this)}
        />
        <View style={styles.header}>
          <View>
            <TouchableOpacity title="" onPress={() => this.openDrawer()}>
              <Icon
                name="align-justify"
                type="font-awesome"
                color="white"
                size={30}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>Kommunity</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <TouchableOpacity title="">
            <Icon name="list" color="#3394C6" size={30} />
          </TouchableOpacity> */}

            <View>
              <Menu>
                <MenuTrigger>
                  <Icon
                    name="filter"
                    type="font-awesome"
                    color="white"
                    size={30}
                  />
                </MenuTrigger>
                <MenuOptions
                  style={{ backgroundColor: "white" }}
                  optionsContainerStyle={{
                    marginTop: 30,
                    borderColor: "#dddce2",
                    borderWidth: 3
                  }}
                >
                  <ScrollView
                    style={{ maxHeight: 120 }}
                    showsVerticalScrollIndicator={true}
                    indicatorStyle={{
                      color: "red",
                      backgroundColor: "yellow"
                    }}
                  >
                    <MenuOption
                      onSelect={this.onpress.bind(this, "All")}
                      // text="Party"
                    >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        ALL
                      </Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Party")}
                      // text="Party"
                    >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Party
                      </Text>
                    </MenuOption>
                    <MenuOption onSelect={this.onpress.bind(this, "Meet-up")}>
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Meet-up
                      </Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Announcement")}
                      // //disabled={true}
                      // text="Announcement"
                    >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Announcement
                      </Text>
                    </MenuOption>

                    <MenuOption onSelect={this.onpress.bind(this, "Business")}>
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Business
                      </Text>
                    </MenuOption>
                    <MenuOption onSelect={this.onpress.bind(this, "Education")}>
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Education
                      </Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Birthday/Anniversary")}
                    >
                      <Text style={{ color: "black", fontWeight: "bold" }}>
                        Birthday/Anniversary
                      </Text>
                    </MenuOption>
                  </ScrollView>
                </MenuOptions>
              </Menu>
            </View>
            {/* <TouchableOpacity title="">
              <Icon name="search" color="#cccccc" size={30} />
            </TouchableOpacity> */}
          </View>
        </View>
        <ScrollView
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
            //style={{backgroundColor:"red",opacity:0.5}}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                onblur={() => this.setState({ drawerview: false })}
                style={{
                  flex: 1,
                  width: 250,
                  backgroundColor: "#2f497e",
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
                    <Text style={styles.drawer}>Kommunity</Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.gotoAboutus.bind(this)}
                    style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
                  >
                    <Text style={styles.drawerOptions}>About Us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.gotoReportProblem.bind(this)}
                    style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
                  >
                    <Text style={styles.drawerOptions}>Report A Problem</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.logout.bind(this)}
                    style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
                  >
                    <Text style={styles.drawerOptions}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{ flex: 1, backgroundColor: "#676261", opacity: 0.3 }}
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
                flexWrap: "wrap-reverse",
                flexDirection: "column-reverse",
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2F497E",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoStyle: {
    //position: "relative",
    height: 50,
    width: 50,
    alignSelf: "flex-start"
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "white"
  },
  drawerHeader: {
    paddingVertical: 20,
    borderTopRightRadius: 10,
    backgroundColor: "#2f497e",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10
    // flexDirection: "column",
    // justifyContent: "space-between"
  },
  drawerOptions: {
    paddingVertical: 20,
    padding: 10,
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontSize: 18,
    color: "white"
    //backgroundColor:"#676761"
  },
  drawer: {
    paddingTop: 10,
    //paddingLeft:5,
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
    //backgroundColor:"#676761"
  }
});
