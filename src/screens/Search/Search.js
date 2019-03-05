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
      UserArray: []
    };
  }

  componentDidMount() {
    this.getDataFromFirebase();
    this.getUserDataFromFirebase();
  }
  getUserDataFromFirebase() {
    let arr3 = [];
    var d = new Date();

    firebase
      .database()
      .ref("app/User")
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
          userId: data.key
        });

        this.setState({ UserArray: arr3 });
        // console.log("aaawwww" + JSON.stringify(arr3));

        // console.log("aaa" + JSON.stringify(this.state.UserArray));
      });
  }
  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    //console.log("date==="+d);
    firebase
      .database()
      .ref("app/Event details")
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
    this.props.navigation.navigate("UserInfo", { UserId: uid });
  }
  render() {
    let searchval = this.state.searchResult.map((val, key) => {
      let name = "";
      let profile = "";
      firebase
        .database()
        .ref("app/User/" + val.userId)
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
              // borderBottomWidth: 0.5,
              // borderBottomColor: "white",
              // backgroundColor: "red"
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              name={name}
              profile={profile}
              testing={() => this.testing(val.uid)}
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
        .ref("app/User/" + val.userId)
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
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" size={30} color="#cccccc" />
            </TouchableOpacity>
            <TextInput
              style={{
                paddingRight: 10,
                color: "white"
              }}
              placeholder="Enter to search"
              placeholderTextColor="#A4AAC1"
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
                color="#cccccc"
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
    backgroundColor: "#2f497e",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
