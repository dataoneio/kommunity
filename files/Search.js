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
import firebase from "../Firebase";
import Feed from "./Feed";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchResult: [],
      initialVals: []
    };
  }

  componentDidMount() {
    this.getDataFromFirebase();
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
        //  console.log("key--" + key1);
        // console.log("---" + result.length);

        arr1.push({
          category: result[0].toString(),
          description: result[3].toString(),
          // uid: data.key,
          title: result[6].toString(),
<<<<<<< HEAD
          url1: result[4].toString()
        });
=======
        url1:result[4].toString()});

        
>>>>>>> 9374598f280a3166aa196b4d5eb53181ccb3bf29

        //  console.log("date-" + result[2].toString());
        // console.log("desc--" + result[3].toString());
        // console.log("title-" + result[6].toString());
        // console.log("url:"+result[4].toString());

        this.setState({ initialVals: arr1 });
        console.log("aaawwww" + JSON.stringify(arr1));

        console.log("aaa" + JSON.stringify(this.state.initialVals));
      });
  }

  handleChangeText = searchval => {
    this.setState({ searchInput: searchval }, () => this.searchByPost());
  };

  searchByPost() {
    var arr2 = this.state.initialVals;
    var result = arr2.filter(search => {
      let v1 = search.description.toUpperCase();
      let v2 = search.title.toUpperCase();
      let v3 = search.category.toUpperCase();
      let s1 = this.state.searchInput.toUpperCase();
      if (v1.includes(s1) || v2.includes(s1) || v3.includes(s1)) {
        return v1;
      }
    });
    this.setState({ searchResult: result });
    console.log("result" + JSON.stringify(result));
  }

  render() {
    let searchval = this.state.searchResult.map((val, key) => {
      return (
        <View key={key} style={{ padding: 5 }}>
          <View
            style={{
              padding: 1,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#d9d9d9",
              backgroundColor: "#e6e6e6"
            }}
          >
            <Feed
              key={key}
              keyval={key}
              val={val}
              //deleteMethod={() => this.deleteNote(val.uid, key)}
              //editMethod={() => this.editNote(val.uid, val.note, val.url1,val.utitleval)}
              //imageMethod={() => this.imageNote(val.uid, val.url1, key)}
            />
          </View>
        </View>
      );
    });

    return (
      <View>
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              title="back"
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" size={30} color="#676261" />
            </TouchableOpacity>
            <TextInput
              style={{
                paddingRight: 10
              }}
              placeholder="enter to search"
              onChangeText={this.handleChangeText}
              autoFocus={true}
              returnKeyType="search"
            />
          </View>
          <View>
            <TouchableOpacity title="back">
              <Icon name="delete" size={30} color="#676261" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            style={{ backgroundColor: "red", padding: 10 }}
          >
<<<<<<< HEAD
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
          </ScrollView>
          <View style={{ paddingBottom: 250 }}>
=======

          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          
          
          
          </ScrollView>
          <View style={{ paddingBottom:250}}>
>>>>>>> 9374598f280a3166aa196b4d5eb53181ccb3bf29
            <ScrollView>
              <View
                style={{
                  flexWrap: "wrap-reverse",
                  flexDirection: "column-reverse"
                }}
              >
                {searchval}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffcc00",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
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
<<<<<<< HEAD
});
=======
});
>>>>>>> 9374598f280a3166aa196b4d5eb53181ccb3bf29
