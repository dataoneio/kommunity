import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import firebase from "../../../Firebase"
export default class BloodBook extends React.Component {
  componentDidMount()
  {
    var { screenProps } = this.props;

    var arr2 = [];
    firebase
      .database()
      .ref("app/"+ screenProps.user.CommunityName+"/User")
      .orderByChild("City")
      .on("child_added", data => {
        arr2.push(data.toJSON().City);
        this.setState({ cityAr: arr2 });
        //this.setState({ alldata: false });
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      BloodGroup: "",
      City: "",
      cityAr:[],
    };
  }

  render() {
    var a = [],
    b = [],
    prev;
  var arr3 = [];
  var arr2 = this.state.cityAr;
  for (var i = 0; i < arr2.length; i++) {
    if (arr2[i] !== prev) {
      a.push({value:arr2[i]});
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
    if (a[i].value == "") {
      a[i].value = "others";
    }
    arr3.push({
      city: a[i],
      occurance: b[i]
    });
  }
    let data = [
      {
        value: "A+"
      },
      {
        value: "A-"
      },
      {
        value: "B+"
      },
      {
        value: "B-"
      },
      {
        value: "O+"
      },
      {
        value: "O-"
      },
      {
        value: "AB+"
      },
      {
        value: "AB-"
      }
    ];
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
          <View>
            <Text style={styles.home}>Blood Book</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
            title="request"
            onPress={() => {  
              this.props.navigation.navigate("BloodBankUsers", {
                txt: this.state.BloodGroup,
                city: this.state.City
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.sendButton}>Search</Text>
              </View>
            </View>
          </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ padding: 10 }}>
          <Dropdown
            label="Blood Group"
            labelColor="#676261"
            data={data}
            onChangeText={BloodGroup => this.setState({ BloodGroup })}
            // value={"None"}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Dropdown
            label="City"
            labelColor="#676261"
            data={a}
            onChangeText={City => this.setState({ City })}
            // value={"None"}
          />
        </View>
        <View>
          <View
            style={{ paddingBottom: 100,alignSelf:"center", padding: 20 }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("BloodBankUsers", {
                  txt: this.state.BloodGroup,
                  city: this.state.City
                });
              }}
              title="Search"
              color="#C60C31"
              style={styles.search}
            />
          </View>
        </View>
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

  search:{
    fontFamily: "lucida grande",

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
    color: "black",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  }
});
