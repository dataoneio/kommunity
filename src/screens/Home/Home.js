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
  BackHandler
} from "react-native";
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
import { Circle, Rect } from "react-native-svg";
// const MyLoader = () => <ContentLoader />
// const MyFacebookLoader = () => <Facebook />
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
      LoggedInMumber: ""
    };
  }
  componentDidMount() {
    //this.setValueLocally();
    this.getValueLocally();
    var { screenProps } = this.props;
    console.log("Did mount");
    const { navigation } = this.props;
    var loggedinnumber = navigation.getParam("LoggedInNumber", "no-number");
    //console.log("hehehehwwwwwwwww----" + loggedinnumber);
    this.setState({ LoggedInMumber: loggedinnumber });
    this.getDataFromFirebase();
  }
  getValueLocally = () => {
    var { screenProps } = this.props;

    AsyncStorage.getItem("token").then(value =>
      this.setState({ getToken: value }, () => {
        console.log("--inside it--" + this.state.getToken);
        screenProps.user.number = this.state.getToken;

        firebase
          .database()
          .ref("app/User")
          .orderByChild("Contact_Number")
          .equalTo(this.state.getToken)
          .on("child_added", data => {
            val1 = data.val();
            if (data.exists()) {
              // console.log("dddddddddddd----" + JSON.stringify(data.key));
              screenProps.user.userphotourl = val1.Profile_photo;
              // console.log("11111111-----" + val1.Profile_photo);
              this.setState({ UserId: data.key }, () => {
                screenProps.user.id = this.state.UserId;
              });
            }
          });
      })
    );
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
        //console.log("---" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }
        //console.log("key--" + key1);
        //console.log("---" + result.length);

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),
          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: result[7].toString()
        });

        // console.log("date-" + result[2].toString());
        // console.log("desc--" + result[3].toString());
        //console.log("title-" + result[6].toString());
        //console.log("url:" + result[4].toString());
        this.setState({ initialVals: arr1 });
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        //console.log("aaawwww" + JSON.stringify(arr1));
        //console.log(
        //   "aaaooooooooooooooooooooooo" + JSON.stringify(this.state.initialVals)
        // );
        //console.log("aaa" + JSON.stringify(this.state.feeds));
      });
  }
  onpress = txt => {
    this.setState({
      onFilter: false
    });
    if (txt == "All") {
      console.log("allPosted........................");
      this.setState({ searchResult: this.state.initialVals });
    } else {
      console.log("oooo" + txt);
      this.setState({ searchInput: txt }, () => this.searchByPost());
    }
  };
  searchByPost() {
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZz" + this.state.searchInput);
    var arr2 = this.state.initialVals;
    console.log("lolololololololol" + JSON.stringify(arr2));
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
    console.log("home it is" + uid);
    this.props.navigation.navigate("UserInfo", { EventId: uid });
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
    console.log("hehehheh" + screenProps.user.screenName);
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
        <View style={styles.header}>
          <Text style={styles.home}>Community Social Network</Text>
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
                    indicatorStyle={{ color: "red", backgroundColor: "yellow" }}
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
        <ScrollView style={{ backgroundColor: "#DDDCE2" }}>
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
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  }
});
