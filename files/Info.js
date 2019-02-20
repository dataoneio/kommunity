import React, { Component } from "react";

import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../Firebase";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
//import { timingSafeEqual } from "crypto";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      txtvalue: "",
      imageurl: "",
      profession: "",
      mobileNo: "",
      BloodGroup: "",
      Gender: "",
      businessStatus: false,
      BusinessName: "",
      BusinessMobileNo: "",
      BusinessCategory: "",
      Type: "",
      city: "",
      states: "",
      addr_line1: "",
      businessAddr_line1: "",
      businessAddr_line2: ""
    };
  }
  componentDidMount() {
    this.getData();
  }

  businessDetails() {
    this.setState({ businessStatus: true });
  }

  goback() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  handlenavigation() {
    const { navigate } = this.props.navigation;
    navigate("Profile", {
      returnData: this.returnData.bind(this),
      returnData1: this.returnData1.bind(this)
    });
  }
  goback1() {
    const { navigate } = this.props.navigation;
    navigate("Info");
    this.setState({ businessStatus: false });
  }

  // hasSpecialChar(char)
  // {
  //   var regex = /^[^!-\/:-@\[-`{-~]+$/;
  //     return regex.test(char);
  // }
  returnData(
    Name,
    Email,
    Photo,
    phone,
    gender,
    bg,
    profession,
    country,
    states,
    city,
    Address_line1
  ) {
    this.setState({
      Name: Name,
      txtvalue: Email,
      imageurl: Photo,
      mobileNo: phone,
      Gender: gender,
      BloodGroup: bg,
      profession: profession,
      country: country,
      states: states,
      city: city,
      addr_line1: Address_line1
    });
  }
  returnData1(name, mobile, type, Category, Address_line1, Address_line2) {
    this.setState({
      BusinessName: name,
      BusinessMobileNo: mobile,
      Type: type,
      BusinessCategory: Category,
      businessAddr_line1: Address_line1,
      businessAddr_line2:Address_line2
    });
  }
  getData() {
    firebase
      .database()
      .ref("app/User/ID1")
      .once("value", data => {
        var value = data.toJSON();
        console.log("----" + value.Profession);

        // console.log("------" + value.Contact_Number);
        console.log("heheheh----" + JSON.stringify(value));
        this.setState({ Name: value.Name });
        this.setState({ txtvalue: value.Email });
        this.setState({ imageurl: value.Profile_photo });
        this.setState({ profession: value.Profession });
        this.setState({ mobileNo: value.Contact_Number });
        console.log("----" + value.Profession);
        console.log("-----gegeggeg" + this.state.Gender);
        this.setState({ Gender: value.Gender });
        this.setState({ BloodGroup: value.Blood_Group });
        this.setState({ country: value.Country });
        this.setState({ states: value.State });
        this.setState({ city: value.City });
        this.setState({ addr_line1: value.Address_line1 });
        // console.log("eeeeee-" + value.Profile_photo);
        // console.log("image---" + this.state.imageurl);
        // console.log("iiii--" + this.state.Name);
        // console.log("---------" + this.state.txtvalue);
        // console;
      });
    firebase
      .database()
      .ref("app/User/ID1/Business_details")
      .once("value", data => {
        var bval = data.toJSON();
        this.setState({ BusinessCategory: bval.Category });
        this.setState({ BusinessName: bval.Name });
        this.setState({ BusinessMobileNo: bval.Contact_Number });
        this.setState({ Type: bval.Type });
        this.setState({businessAddr_line1:bval.Address_line1});
        this.setState({businessAddr_line2:bval.Address_line2});


        console.log("hehheheheheh----" + this.state.BusinessMobileNo);
      });
  }

  render() {
    if (this.state.businessStatus) {
      console.log("Businessstatus" + this.state.businessStatus);
      return (
        <View>
          <View style={styles.header}>
            <View>
              <TouchableOpacity title="" onPress={this.goback1.bind(this)}>
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>Business Details</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              {/* <TouchableOpacity
                title=""
                onPress={this.updateBusinessdetails.bind(this)}
              >
                <Icon name="done" color="white" size={30} />
              </TouchableOpacity> */}
            </View>
          </View>
          <ScrollView style={{ padding: 10 }}>
            <View>
              <View>
                <TextInput
                  label="Business Name"
                  editable={false}
                  disabled={true}
                  placeholder="Business Name"
                  placeholderTextColor="#676261"
                  onChangeText={BusinessName => this.setState({ BusinessName })}
                  value={this.state.BusinessName}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
              <View>
                <TextInput
                  label="Business mobile number"
                  editable={false}
                  disabled={true}
                  ref="mobileNo"
                  keyboardType="phone-pad"
                  style={{ backgroundColor: "transparent", width: "100%" }}
                  placeholder="Business mobile number"
                  onChangeText={BusinessMobileNo =>
                    this.setState({ BusinessMobileNo })
                  }
                  value={this.state.BusinessMobileNo.toString()}
                />
              </View>

              <View>
                <TextInput
                  label="Business type"
                  editable={false}
                  disabled={true}
                  placeholder="Business type "
                  onChangeText={Type => this.setState({ Type })}
                  value={this.state.Type}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
              <View style={{ padding: 10, paddingBottom:10 }}>
                <Dropdown
                  disabled={true}
                  label="Business Category"
                  labelColor="#676261"
                  onChangeText={BusinessCategory =>
                    this.setState({ BusinessCategory })
                  }
                  value={this.state.BusinessCategory}
                />
              </View>
              <View style={{ padding:5 }}>
                <TextInput
                  label="Business address line 1"
                  editable={false}
                  disabled={true}
                  placeholder="Business Address"
                  onChangeText={businessAddr_line1 => this.setState({businessAddr_line1  })}
                  value={this.state.businessAddr_line1}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
              <View style={{ padding:5}}>
                <TextInput
                  label="Business address line 2"
                  editable={false}
                  disabled={true}
                  placeholder="Business Address"
                  onChangeText={businessAddr_line2 => this.setState({businessAddr_line2  })}
                  value={this.state.businessAddr_line2}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.header}>
          <View>
            <TouchableOpacity title="" onPress={this.goback.bind(this)}>
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>Info</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              title=""
              onPress={this.handlenavigation.bind(this)}
            >
              <Icon name="edit" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ padding: 10 }}>
          <View>
            <View style={{ alignSelf: "center", paddingTop: 20 }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  borderRadius={50}
                  style={styles.ImageContainer1}
                  source={{
                    uri: this.state.imageurl
                  }}
                  indicator={Progress.Circle}
                />

                {/* <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={{ fontFamily: "lucida grande" }}>
                    {" "}
                    Edit Photo{" "}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "stretch"
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  color="red"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("Info")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Posts"
                  onPress={() => this.props.navigation.navigate("MyPosts")}
                />
              </View>
            </View>
            <View>
              <View>
                <TextInput
                  label="Name"
                  disabled={true}
                  editable={false}
                  placeholder="Name"
                  placeholderTextColor="#676261"
                  onChangeText={Name => this.setState({ Name })}
                  value={this.state.Name}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
              {/* <TextInput
            placeholder="Email"
            placeholderTextColor="#676261"
            // onChangeText={Email => this.setState({Email})}
            // value={this.state.Email}
            style={{ backgroundColor: "transparent" }}
          /> */}
              <View>
                <TextInput
                  label="Email ID"
                  editable={false}
                  disabled={true}
                  placeholder="Email ID"
                  onChangeText={txtvalue => this.setState({ txtvalue })}
                  value={this.state.txtvalue}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>

              <View>
                <TextInput
                  label="Profession"
                  editable={false}
                  disabled={true}
                  placeholder="Profession"
                  placeholderTextColor="#676261"
                  onChangeText={profession => this.setState({ profession })}
                  value={this.state.profession}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>

              <View>
                <TextInput
                  label="Mobile number"
                  editable={false}
                  disabled={true}
                  ref="mobileNo"
                  keyboardType="numeric"
                  style={{ backgroundColor: "transparent", width: "100%" }}
                  placeholder="Mobile number"
                  onChangeText={mobileNo => this.setState({ mobileNo })}
                  value={this.state.mobileNo.toString()}
                />
              </View>

              <View style={{ padding: 10 }}>
                <Dropdown
                  disabled={true}
                  label="Gender"
                  labelColor="#676261"
                  onChangeText={Gender => this.setState({ Gender })}
                  value={this.state.Gender}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Dropdown
                  disabled={true}
                  label="Bloodgroup"
                  labelColor="#676261"
                  onChangeText={Blood_Group => this.setState({ Blood_Group })}
                  value={this.state.BloodGroup}
                />
              </View>
              <View>
                <TextInput
                  label="address line 1"
                  // ref="mobileNo"
                  // keyboardType="numeric"
                  editable={false}
                  disabled={true}
                  style={{ backgroundColor: "transparent", width: "100%" }}
                  placeholder="Address line 1"
                  onChangeText={addr_line1 => this.setState({ addr_line1 })}
                  value={this.state.addr_line1}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Dropdown
                  disabled={true}
                  label="country"
                  labelColor="#676261"
                  // data={this.state.countryArray}
                  // onChangeText={this.handleChangeText.bind(this)}
                  value={this.state.country}
                />
              </View>

              <View style={{ padding: 10 }}>
                <Dropdown
                  disabled={true}
                  label="state"
                  labelColor="#676261"
                  // data={this.state.stateArray}
                  // onChangeText={this.handleChangeText1.bind(this)}
                  value={this.state.states}
                />
              </View>

              <View style={{ padding: 10 }}>
                <Dropdown
                  disabled={true}
                  label="city"
                  labelColor="#676261"
                  // data={this.state.cityArray}
                  //onChangeText={this.handleChangeText2.bind(this)}
                  value={this.state.city}
                />
              </View>
              <View style={{ paddingBottom: 100 }}>
                <Button
                  onPress={this.businessDetails.bind(this)}
                  title="Business Details"
                  color="#676261"
                  //accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
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
  ImageContainer1: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden"
  },
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
    fontSize: 18,
    color: "white"
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
