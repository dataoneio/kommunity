import React, { Component } from "react";

// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

// import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,ScrollView
} from "react-native";
import Users from "../../components/Users/Users";
// import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
const win = Dimensions.get("window");

export default class CityUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      CityUserData: [],
      loading: true
    };
  }
  componentDidMount() {
    var { navigation } = this.props;
    var arr1 = [];
    var city = navigation.getParam("city", "no value");
    //alert("eeee"+city)
    if (city == "others") {
      city = "";
    }
    console.log("did mount");
    firebase
      .database()
      .ref("app/User")
      .orderByChild("City")
      .equalTo(city)
      .on("child_added", data => {
        arr1.push({
          name: data.toJSON().Name,
          gender: data.toJSON().Gender,
          Profile_image: data.toJSON().Profile_photo,
          userId: data.key,
          city:data.toJSON().City
        });
        this.setState({ CityUserData: arr1 });
        this.setState({ loading: false });
      });
  }

  render() {
    let vals = this.state.CityUserData.map((val, key) => {
      return (
        <View key={key}>
         <View
            style={{
              padding:5,
            }}
          ></View>
          <Users
            name={val.name}
            gender={val.gender}
            image={val.Profile_image}
            city={val.city}
            viewUser={()=>this.viewUser(val.userId)}
          />
          {/* <Text>{val.name}</Text>
          <Text>{val.gender}</Text>
          <Image style={{width:50, height:50}} source={{uri:val.Profile_image}}/> */}
        </View>
      );
    });
    return (
      <View>
        <ScrollView>
        {/* <Text>CityUsers page</Text> */}
        <View>{vals}</View>
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
  occurance: {
    fontFamily: "lucida grande",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "black"
  },
  city: {
    fontFamily: "lucida grande",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "black"
  },
  header: {
    backgroundColor: "#2f497e",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
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