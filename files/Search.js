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
        url1:result[4].toString()});

        

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

  clearSearch()
  {
      this.setState({searchInput:""});
  }
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
              borderBottomWidth:0.5,
              borderBottomColor:"white",
              backgroundColor: "#1B2936"
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
              style={{paddingTop: 7}}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" size={30} color="#cccccc" />
            </TouchableOpacity>
            <TextInput
              style={{
                paddingRight: 10,
                color:"white"
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
            <TouchableOpacity title="delete" onPress={this.clearSearch.bind(this)}>
              <Icon name="close" type="material-community" size={30} color="#cccccc" style={{paddingTop:7}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {/* <ScrollView
            horizontal={true}
            style={{ backgroundColor: "transparent", padding: 10 }}
          >
          <Text>hello</Text>
      
          
          
          
          </ScrollView> */}
          <View style={{ paddingBottom:10}}>
            <ScrollView>
              <View
                style={{
                  flexWrap: "wrap-reverse",
                  flexDirection: "column-reverse",
                  backgroundColor:"#1B2936"
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
    backgroundColor: "#243545",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 5,
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
});
