import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  ScrollView
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
const win = Dimensions.get("window");

export default class Matrimonial extends React.Component {
  componentDidMount() {
    this.getStates();
  }
  getStates() {
    var arr2 = [];
    firebase
      .database()
      .ref("app/country/2/states")
      .on("child_added", data => {
        //console.log("--data" + data.key);
        arr2.push({
          value: data.key
        });
        this.setState({ stateArray: arr2 });
      });
  }
  handleChangeState = stateFilters => {
    this.setState({ stateFilter: stateFilters, city: "" }, () => {
     this.findcity();
    });
  };
  findcity() {
    var arr3 = [];
    firebase
      .database()
      .ref("app/country/2/states/" + this.state.stateFilter)
      .on("child_added", data => {
       // console.log("rrreeerr---" + data.val());
        arr3.push({
          value: data.val()
        });
        this.setState({ cityArray: arr3 });
      });
   // console.log("-------city");
  }
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      height: 40,
      Name: "",
      MinAge: "0",
      MaxAge: "10000",
      Gender: "",
      stateArray: [],
      cityArray: [],
      stateFilter: "",
      cityFilter: ""
    };
  }

  render() {
    let data = [
      {
        value: "Female"
      },
      {
        value: "Male"
      }
    ];
    const { height } = this.state;

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
            <Text style={styles.home}>Matrimonial </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <ScrollView>
          <View style={{ padding: 5 }}>
            <TextInput
              label="Name"
              style={{
                width: this.state.testWidth,
                borderColor: "#908a89",
                borderWidth: 0.5,
                fontSize: 12,
                backgroundColor: "white"
              }}
              maxLength={200}
              placeholder="Name"
              placeholderTextColor="#908a89"
              onChangeText={Name => this.setState({ Name })}
              editable={true}
              value={this.state.Name}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 5
            }}
          >
            <TextInput
              style={{
                borderColor: "#908a89",
                borderWidth: 0.5,
                fontSize: 12,
                width: win.width / 2 - 20,
                backgroundColor: "white"
              }}
              keyboardType="numeric"
              maxLength={200}
              placeholder="Min Age"
              // placeholder={"Your problem description"}
              placeholderTextColor="#908a89"
              onChangeText={MinAge => this.setState({ MinAge })}
              editable={true}
              // value={this.state.descInput.slice(0, 200)}
              //value={this.state.MinAge}
            />

            <TextInput
              style={{
                borderColor: "#908a89",
                borderWidth: 0.5,
                fontSize: 12,
                width: win.width / 2 - 20,
                backgroundColor: "white"
              }}
              keyboardType="numeric"
              maxLength={200}
              placeholder="Max Age"
              // placeholder={"Your problem description"}
              placeholderTextColor="#908a89"
              onChangeText={MaxAge => this.setState({ MaxAge })}
              editable={true}
              // value={this.state.descInput.slice(0, 200)}
             // value={this.state.MaxAge}
            />
          </View>
          <View style={{ padding: 5 }}>
            <Dropdown
              label="Gender"
              labelColor="#676261"
              data={data}
              onChangeText={Gender => this.setState({ Gender })}
              value={this.state.Gender}
            />
          </View>
          <View style={{ padding: 5 }}>
            <Dropdown
              label="State"
              labelColor="#676261"
              data={this.state.stateArray}
              onChangeText={this.handleChangeState.bind(this)}
              value={this.state.stateFilter}
            />
          </View>

          <View style={{ padding: 5 }}>
            <Dropdown
              label="City"
              labelColor="#676261"
              data={this.state.cityArray}
              onChangeText={cityFilter => this.setState({ cityFilter })}
              value={this.state.cityFilter}
            />
          </View>

          <View
            style={{ paddingBottom: 100, alignSelf: "center", padding: 20 }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("MatrimonialSearch", {
                  Name: this.state.Name,
                  City: this.state.cityFilter,
                  State: this.state.stateFilter,
                  MinAge: this.state.MinAge,
                  MaxAge: this.state.MaxAge,
                  Gender: this.state.Gender
                });
              }}
              title="Search"
              color="#C60C31"
              style={styles.search}
            />
          </View>
        </ScrollView>
        {/* <View style={{ paddingVertical: 40, paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{ padding: 4, borderRadius: 5, borderWidth: 0.5 }}
            on
            onPress={() => {
              this.props.navigation.navigate("MatrimonialForm");
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Icon name="add" color="#c60c31" size={30} />
              <Text style={styles.home1}>Update Matrimonial Details</Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View style={{ paddingBottom: 100, alignSelf: "center", padding: 20 }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("BloodBankUsers");
            }}
            title="Skip"
            color="#C60C31"
            style={styles.search}
          />
        </View> */} 
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
  home1: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "#C60C31"
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
  },
  search: {
    fontFamily: "lucida grande"
  }
});
