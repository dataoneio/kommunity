import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import firebase from "../../../Firebase";
import Feed from "../../components/Feed/Feed";
import UserIcon from "../../components/UserIcon/UserIcon";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResult: [],
      searchResult1: [],
      initialVals: [],
      UserArray: [],
      bloodgroup: "",
      flag: false,
      city: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    var bloodgroup = navigation.getParam("txt", "not");
    var city = navigation.getParam("city", "no");
    this.setState({ bloodgroup: bloodgroup, city: city }, () => {
      if (this.state.bloodgroup != "") {
        // alert(this.state.bloodgroup + "jellos");
        this.setState(
          { flag: true, bloodgroup: bloodgroup, city: city },
          () => {
            // this.getDataFromFirebase();
            this.getUserDataFromFirebase();
          }
        );

        // this.setState({ bloodgroup: bloodgroup }, () => {
        //   this.searchByUser1();
        // });
      }
    });

    this.getDataFromFirebase();
    this.getUserDataFromFirebase();
  }
  searchByUser1() {
    // alert(this.state.UserArray);
    console.log("BLOOOOOOOOOOOOOOOOOD" + this.state.bloodgroup);
    var arr4 = this.state.UserArray;
    var result1 = arr4.filter(search => {
      let r1 = search.Blood_Group.toUpperCase();

      let st1 = this.state.bloodgroup.toUpperCase();
      if (r1.includes(st1)) {
        return true;
      }
    });
    if (this.state.city != "") {
      var result2 = result1.filter(search => {
        let r1 = search.City.toUpperCase();
        let st1 = this.state.city.toUpperCase();
        if (r1.includes(st1)) {
          return true;
        }
      });
      this.setState({ searchResult1: result2 });
    } else {
      this.setState({ searchResult1: result1 });
    }

    console.log("result1" + JSON.stringify(result1));
  }
  getUserDataFromFirebase() {
    let arr3 = [];
    var d = new Date();
    var { screenProps } = this.props;

    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/User")
      .on("child_added", data => {
        var result = [];
        var key2 = [];
        key2.push(data.key);
        let arr = data.toJSON();
        console.log("---" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }

        arr3.push({
          Name: result[8].toString(),
          profile_photo: result[10].toString(),
          Blood_Group: result[1].toString(),
          userId: data.key,
          City: result[3].toString()
        });
        if (this.state.flag) {
          this.setState({ UserArray: arr3 }, () => {
            this.searchByUser1();
          });
        } else {
          this.setState({ UserArray: arr3 });
        }
        // console.log("aaawwww" + JSON.stringify(arr3));

        // console.log("aaa" + JSON.stringify(this.state.UserArray));
      });
  }
  getDataFromFirebase() {
    var { screenProps } = this.props;
    let arr1 = [];
    var d = new Date();
    //console.log("date==="+d);
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        console.log("---" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),
          description: result[3].toString(),
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: result[7].toString(),
          uid: data.key
        });

        this.setState({ initialVals: arr1 });
        // console.log("aaawwww" + JSON.stringify(arr1));

        // console.log("aaa" + JSON.stringify(this.state.initialVals));
      });
  }

  handleChangeText = searchval => {
    this.setState({ searchInput: searchval }, () => {
      this.searchByPost(), this.searchByUser();
    });
  };
  searchByUser() {
    // console.log("USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log("BLOOOOOOOOOOOOOOOOOD" + this.state.bloodgroup);
    var arr4 = this.state.UserArray;
    var result1 = arr4.filter(search => {
      console.log(
        search.Name.toUpperCase() + "lololololololoLLLLLLLLLLLLLLLLLLLLLLLLL"
      );
      let r1 = search.Name.toUpperCase();
      let st1 = this.state.searchInput.toUpperCase();
      if (r1.includes(st1)) {
        return true;
      }
    });
    this.setState({ searchResult1: result1 });
    console.log("result1" + JSON.stringify(result1));
  }
  clearSearch() {
    this.setState({ searchInput: "" });
  }
  viewDetail(uid, title, desc, imgurl) {
    console.log("yoho------");
    this.props.navigation.navigate("ViewFeed", {
      id: uid,
      Title: title,
      description: desc,
      url: imgurl,
      fromSearch: "yes"
    });
  }
  searchByPost() {
    var arr2 = this.state.initialVals;
    var result = arr2.filter(search => {
      let v1 = search.description.toUpperCase();
      let v2 = search.title.toUpperCase();
      // let v3 = search.category.toUpperCase();
      let s1 = this.state.searchInput.toUpperCase();
      if (v1.includes(s1) || v2.includes(s1)) {
        return true;
      }
    });
    this.setState({ searchResult: result });
    console.log("result" + JSON.stringify(result));
  }

  testing(uid) {
    console.log("search it is" + uid);
    this.props.navigation.navigate("UserInfo", { EventId: uid });
  }
  onUserIconPress(uid) {
    this.props.navigation.navigate("UserInfo", {
      UserId: uid,
      screen: "Search"
    });
  }
  render() {
    var { screenProps } = this.props;
    let searchval = this.state.searchResult.map((val, key) => {
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
              padding: 1,
              borderRadius: 5,
              backgroundColor: "transparent"
            }}
          >
            <Feed
              comname={screenProps.user.CommunityName}
              key={key}
              keyval={key}
              val={val}
              name={name}
              profile={profile}
              testing={() => this.testing(val.uid)}
              viewDetailsMethod={() =>
                this.viewDetail(val.uid, val.title, val.description, val.url1)
              }
            />
          </View>
        </View>
      );
    });
    let searchUServal = this.state.searchResult1.map((val, key) => {
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
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5,
              backgroundColor: "transparent"
            }}
          >
            <UserIcon
              key={key}
              keyval={key}
              val={val}
              name={name}
              profile={profile}
              onUserIconPress={() => this.onUserIconPress(val.userId)}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              title="back"
              style={{ paddingTop: 7 }}
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Icon name="arrow-back" size={30} color="#f2f2f2" />
            </TouchableOpacity>
            <TextInput
              style={{
                padding: 10,
                paddingRight: 10,
                color: "white"
              }}
              placeholder="Enter to search"
              placeholderTextColor="#f2f2f2"
              onChangeText={this.handleChangeText}
              autoFocus={true}
              returnKeyType="search"
              value={this.state.searchInput}
            />
          </View>
          <View>
            <TouchableOpacity
              title="delete"
              onPress={this.clearSearch.bind(this)}
            >
              <Icon
                name="close"
                type="material-community"
                size={30}
                color="#f2f2f2"
                style={{ paddingTop: 7 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            style={{ borderBottomColor: "#dddce2", borderBottomWidth: 5 }}
          >
            <View
              style={{
                flexDirection: "row"
              }}
            >
              {searchUServal}
            </View>
          </ScrollView>
          <ScrollView>
            <View
              style={{
                // flexWrap: "wrap-reverse",
                // flexDirection: "column-reverse",
                backgroundColor: "#dddce2"
              }}
            >
              {searchval}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C60C31",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
