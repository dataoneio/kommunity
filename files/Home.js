import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
//import { Button } from "native-base";
import firebase from "../Firebase";
import Feed from "./Feed";
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
      isLoading: true
    };
  }
  componentDidMount() {
    console.log("will mount");
    this.getDataFromFirebase();
  }
  // componentDidMount() {
  //   // this.getDataFromFirebase();
  // }

  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
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
        console.log("key--" + key1);
        console.log("---" + result.length);

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),

          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId:"ED1"
        });

        console.log("date-" + result[2].toString());
        console.log("desc--" + result[3].toString());
        console.log("title-" + result[6].toString());
        console.log("url:" + result[4].toString());
        this.setState({ initialVals: arr1 });
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        console.log("aaawwww" + JSON.stringify(arr1));
        console.log(
          "aaaooooooooooooooooooooooo" + JSON.stringify(this.state.initialVals)
        );
        console.log("aaa" + JSON.stringify(this.state.feeds));
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

  viewDetail(uid,title,desc,imgurl) {
    console.log("yoho------");
    this.props.navigation.navigate("ViewFeed", { id: uid ,Title:title,description:desc,url:imgurl});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ paddingLeft: 20 ,paddingTop:30}}>
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

    let search =
      this.state.onFilter === true
        ? this.state.initialVals
        : this.state.searchResult;
    let searchval = search.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: "white",
              backgroundColor: "#1B2936"
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              //deleteMethod={() => this.deleteNote(val.uid, key)}
              viewDetailsMethod={() => this.viewDetail(val.uid,val.title,val.description,val.url1)
              }
              //imageMethod={() => this.imageNote(val.uid, val.url1, key)}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{ paddingBottom: 10 ,backgroundColor:"#1B2936"}}>
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
                  <Icon name="list" color="#cccccc" size={30} />
                </MenuTrigger>
                <MenuOptions
                  style={{ backgroundColor: "#243545" }}
                  optionsContainerStyle={{
                    marginTop: 30,
                    borderColor: "#233443",
                    borderWidth: 10
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
                      <Text style={{ color: "white" }}>ALL</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Party")}
                      // text="Party"
                    >
                      <Text style={{ color: "white" }}>Party</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.onpress.bind(this, "Meet-up")}>
                      <Text style={{ color: "white" }}>Meet-up</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Announcement")}
                      // //disabled={true}
                      // text="Announcement"
                    >
                      <Text style={{ color: "white" }}>Announcement</Text>
                    </MenuOption>

                    <MenuOption onSelect={this.onpress.bind(this, "Business")}>
                      <Text style={{ color: "white" }}>Business</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.onpress.bind(this, "Education")}>
                      <Text style={{ color: "white" }}>Education</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={this.onpress.bind(this, "Birthday/Anniversary")}
                    >
                      <Text style={{ color: "white" }}>
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
        <ScrollView>
          <View style={{ paddingBottom: 50 }}>
            <View
              style={{
                flexWrap: "wrap-reverse",
                flexDirection: "column-reverse",
                backgroundColor: "#1B2936"
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
    backgroundColor: "#243545",
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
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
