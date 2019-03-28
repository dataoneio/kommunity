import React, { Component } from "react";

import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import AddressBookComponent from "../../components/AddressBookComponent/AddressBookComponent";
import firebase from "../../../Firebase";
import { ScrollView } from "react-native-gesture-handler";
export default class AddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityAr: [],
      alldata: true
    };
  }
  getCityUserDetails(city) {
    this.props.navigation.navigate("CityUsers", { city: city });
    //alert("---" + city);
  }
  componentWillMount() {
    var arr2 = [];
    firebase
      .database()
      .ref("app/User")
      .orderByChild("City")
      .on("child_added", data => {
        arr2.push(data.toJSON().City);
        this.setState({ cityAr: arr2 });
        this.setState({ alldata: false });
      });
  }
  componentWillUnmount() {}
  render() {
    if (this.state.alldata) {
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
    var a = [],
      b = [],
      prev;
    var arr3 = [];
    var arr2 = this.state.cityAr;
    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i] !== prev) {
        a.push(arr2[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr2[i];
    }
    //console.log("----a---" + a);
    //console.log("----b---" + b);
    //console.log("length=---" + a.length);
    for (var i = 0; i < a.length; i++) {
      console.log(i);
      if (a[i] == "") {
        a[i] = "others";
      }
      arr3.push({
        city: a[i],
        occurance: b[i]
      });
    }
    //console.log("ssssss"+this.state.cityAr)
    mapping = arr3.map((val, key) => {
      console.log("aaa--" + val.city + "----" + val.occurance);
      return (
        <View key={key}>
          <View
            style={{
              padding: 5,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <AddressBookComponent
              key={key}
              city={val.city}
              occurance={val.occurance}
              getCityUserDetails={() => this.getCityUserDetails(val.city)}
            />
          </View>
        </View>
      );
    });

    return (
      <View style={{}}>
        <View style={styles.header}>
          <Text style={styles.home}>AddressBook</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              paddingBottom: 55,
              backgroundColor: "#f2f2f2"
            }}
          >
            {mapping}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  header: {
    backgroundColor: "#C60C31",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  sendButton: {
    color: "white",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  }
});
