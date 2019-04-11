import React, { Component } from "react";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import firebase from "../../../Firebase";
import Users from "../../components/Users/Users";

export default class BloodBankUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      flag: false,
      searchResult1:[],
      bloodgroup:"",
      city:"",
      UserArray:[],
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
      }
    });
  }
  viewUser(userId) {
    //alert("aaaa"+userId)
    this.props.navigation.navigate("UserInfo", {
      UserId: userId,
      screen: "BloodBank"
    });
  }
  getUserDataFromFirebase() {
    let arr1 = [];
    var d = new Date();

    firebase
      .database()
      .ref("app/User").orderByChild("Blood_Group").equalTo(this.state.bloodgroup)
      .on("child_added", data => {
        ///console.log("eeee----"+this.state.city)
        if(this.state.city === "")
        {
        arr1.push({
          name: data.toJSON().Name,
          gender: data.toJSON().Gender,
          Profile_image: data.toJSON().Profile_photo,
          userId: data.key,
          City: data.toJSON().City
        });
          this.setState({ UserArray: arr1 })
        }
        else{
          if(data.toJSON().City === this.state.city)
          {
            arr1.push({
              name: data.toJSON().Name,
              gender: data.toJSON().Gender,
              Profile_image: data.toJSON().Profile_photo,
              userId: data.key,
              City: data.toJSON().City
            });
            this.setState({ UserArray: arr1 })
          }
        }
        })
      
  }
 

  render() {
    let vals=this.state.UserArray.map((val,key)=>{
      console.log("eeeee"+val.name)
      return(
        <View key={key}>
          <View
            style={{
              padding: 5
            }}
          />
          <Users
            name={val.name}
            gender={val.gender}
            image={val.Profile_image}
            city={val.city}
            viewUser={() => this.viewUser(val.userId)}
          />
          </View>

      )
    })
    return (
      <View>
        <View style={styles.header}>
            <View>
              <TouchableOpacity
                title=""
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              >
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>Users</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            />
          </View>
        <View>{vals}</View>
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
