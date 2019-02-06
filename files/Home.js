import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button, ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
//import { Button } from "native-base";
import firebase from "../Firebase";
import Feed from "./Feed"
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ftitle: "",
      fdescription: "",
      fdate: "",
      feeds: []
    };
  }
  componentWillMount() {
    console.log("will mount");
    this.getDataFromFirebase();

  }
  componentDidMount()
  {
   // this.getDataFromFirebase();

  }

  getDataFromFirebase() {
    let arr1 = [];
    var d=new Date();
    console.log("date==="+d);
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
                description: result[3].toString(),
                uid: data.key,
                title: result[6].toString(),
                url1:result[4].toString()});
            
        console.log("date-" + result[2].toString());
        console.log("desc--" + result[3].toString());
        console.log("title-" + result[6].toString());
        console.log("url:"+result[4].toString());

        this.setState({ feeds: arr1});
        console.log("aaawwww" + JSON.stringify(arr1));

        console.log("aaa" + JSON.stringify(this.state.feeds));
      });
  }
  render() {

    let feed= this.state.feeds.map((val,key)=>{
      return(
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
              /></View>

        </View>
      )
    })
    return (
      <View style={{paddingBottom:10}}>

      
      <View style={styles.header}>
        <Text style={styles.home}>Community Social Network</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity title="">
            <Icon name="list" color="black" size={30} />
          </TouchableOpacity>
          <TouchableOpacity title="">
            <Icon name="search" color="black" size={30} />
          </TouchableOpacity>
        </View>
    
      </View>
      <ScrollView >
      <View style={{paddingBottom:50}}>

      <View>{feed}</View>
      </View>

      </ScrollView>

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
  home: {
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18
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