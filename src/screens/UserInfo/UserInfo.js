import React, { Component } from "react";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  Dimensions
} from "react-native";
import renderIf from "../../components/ViewFeed/renderIf";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs";
import DatePicker from "react-native-datepicker";
import styles from "./UserInfoStyle";
const win = Dimensions.get("window");
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class UserInfo extends React.Component {
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
      businessAddr_line2: "",
      UserId: "",
      Admins: [],
      isAdmin: false,
      getToken: "",
      isProfileAdmin: false,
      postsArr: [],
      lastestPostKey: "",
      commentsArr: [],
      PersonalInfo: false,
      BusinessInfo: false,
      MatrimonialInfo: false,
      PersonalIconStatus: "down",
      BusinessIconStatus: "down",
      MatrimonialIconStatus: "down",
      Mname: "",
      Fname: "",
      Education: "",
      MaritalStatus: "",
      maxdate: "",
      time: "",
      Salary: "",
      height: "",
      weight: "",
      Hobbies: "",
      BirthPlace: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    var { screenProps } = this.props;
console.log("did mount")
    var EventId = navigation.getParam("EventId", "No event found");
    var actualuserId = navigation.getParam("UserId", "No User found");
   // console.log("eventId" + EventId);
   // console.log("userId" + actualuserId);
    this.setState({ getToken: screenProps.user.number }, () => {
     // console.log("from userinfo" + this.state.getToken);
      this.getAdminsfromfirebase();
      if (EventId == "No event found") {
        this.setState({ UserId: actualuserId });
        this.getData(actualuserId);
      } else if (actualuserId == "No User found") {
        //console.log("hellop1" + EventId);
        firebase
          .database()
          .ref(
            "app/" +
              screenProps.user.CommunityName +
              "/Event details/" +
              EventId
          )
          .on("value", data => {
            var val1 = data.toJSON();
            if (!val1) {
              this.props.navigation.navigate("HomeNavigator");
            } else {
              this.setState({ UserId: val1.UserId });
              this.getData(val1.UserId);
            }
          });
      }
    });
  }

  sendWhatsAppMessage = link => {
    Linking.canOpenURL(link).then(supported => {
      if (!supported) {
        alert("Please install whatsapp to send direct message via whatsapp!");
      } else {
        return Linking.openURL(link);
      }
    });
  };
  shareToWhatsAppWithContact = () => {
    this.sendWhatsAppMessage("whatsapp://send?phone=" + this.state.mobileNo);
  };

  setPersonalInfo() {
    this.setState({ PersonalInfo: !this.state.PersonalInfo }, () => {
      if (this.state.PersonalInfo == true) {
        this.setState({ PersonalIconStatus: "up" });
      } else {
        this.setState({ PersonalIconStatus: "down" });
      }
    });
    this.setState({ MatrimonialInfo: false });
    this.setState({ BusinessInfo: false });
    this.setState({ BusinessIconStatus: "down" });
    this.setState({ MatrimonialIconStatus: "down" });
  }
  setBusinessInfo() {
    this.setState({ BusinessInfo: !this.state.BusinessInfo }, () => {
      if (this.state.BusinessInfo == true) {
        this.setState({ BusinessIconStatus: "up" });
      } else {
        this.setState({ BusinessIconStatus: "down" });
      }
    });
    this.setState({ PersonalInfo: false });
    this.setState({ MatrimonialInfo: false });
    this.setState({ PersonalIconStatus: "down" });
    this.setState({ MatrimonialIconStatus: "down" });
  }
  setMatrimonialInfo() {
    this.setState({ PersonalInfo: false });
    this.setState({ BusinessInfo: false });
    this.setState({ PersonalIconStatus: "down" });
    this.setState({ BusinessIconStatus: "down" });

    this.setState({ MatrimonialInfo: !this.state.MatrimonialInfo }, () => {
      if (this.state.MatrimonialInfo == true) {
        this.setState({ MatrimonialIconStatus: "up" });
      } else {
        this.setState({ MatrimonialIconStatus: "down" });
      }
    });
  }

  businessDetails() {
    this.setState({ businessStatus: true });
  }
  checkAdmin() {
    var { screenProps } = this.props;
    console.log("CHCEK ADMINNNNN" + screenProps.user.number);
    var a = JSON.stringify(this.state.getToken);
    console.log("a" + a);
    for (let i = 0; i < this.state.Admins.length; i++) {
      if (JSON.stringify(this.state.Admins[i]) == a) {
        console.log("true1--"+i);
        this.setState({ isAdmin: true });
        return true;
      } else {
        this.setState({ isAdmin: false });
      }
      //console.log(
      //  JSON.stringify(this.state.Admins[i]) + " these are for loop admins"
     // );
    }
  }

  checkProfileAdmin() {
    var { screenProps } = this.props;
    console.log("checkProfileAdmin123123" + this.state.mobileNo);
    var a = JSON.stringify(this.state.mobileNo);
    console.log("a" + a);
    for (let i = 0; i < this.state.Admins.length; i++) {
     // console.log(this.state.Admins[i]);
     // console.log("inside" + a);
      if (JSON.stringify(this.state.Admins[i]) == a) {
        this.setState({ isProfileAdmin: true }, () => {
          console.log("user 45445 profile is admin" + a + this.state.Admins[i]);
        });

        return true;
      } else {
        this.setState({ isProfileAdmin: false });
        console.log("user profile is not admin");
      }
      // console.log(
      //   JSON.stringify(this.state.Admins[i]) +
      //     " these are for loop profile admins"
      // );
    }
  }

  masterDeleter() {
    console.log("console1$");
    this.getlastestPostKey();
  }
  goback() {
    var { navigation } = this.props;
    var screen = navigation.getParam("screen", "");
    if (screen === "BroadcastedPost") {
      //alert("back")
      const { navigate } = this.props.navigation;
      navigate("BroadcastedPost");
    } else if (screen == "Search") {
      const { navigate } = this.props.navigation;
      navigate("Search");
    } else if (screen == "BloodBank") {
      const { navigate } = this.props.navigation;
      navigate("BloodBankUsers");
    } else if (!(screen == "")) {
      const { navigate } = this.props.navigation;
      navigate("CityUsers");
    } else {
      const { navigate } = this.props.navigation;
      navigate("Home");
    }
  }

  getlastestPostKey() {
    console.log("getlastestPostKey_Started");
    var index1 = 0;
    var { navigation } = this.props;
    var { screenProps } = this.props;
    let commentsArrLocal = [];
    let userLocal = this.state.UserId;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details/")
      .orderByKey()
      .limitToLast(1)
      .on(
        "child_added",
        function(snap) {
          this.setState({ lastestPostKey: snap.key }, () => {
            // console.log(this.state.lastestPostKey);
            firebase
              .database()
              .ref("app/" + screenProps.user.CommunityName + "/Event details/")
              .orderByKey()
              .on(
                "child_added",
                function(snapshot) {
                  if (snapshot.val().Comments != "") {
                    commentsArrLocal[index1] = snapshot.key;
                    index1++;
                    // console.log("insideChildAdded");
                  }
                  if (snapshot.key === this.state.lastestPostKey) {
                    // console.log("loopEnded");
                    this.setState({ commentsArr: commentsArrLocal }, () => {
                      this.deleteComments();
                      console.log("console2$");
                      this.deletePosts();
                      console.log("console3$");
                      this.deleteUser();
                      console.log("console4$");
                    });
                  }
                }.bind(this)
              );
          });
        }.bind(this)
      );
    console.log("getlastestPostKey_Ended");
  }

  deleteComments() {
    console.log("deleteComments_Started");
    var { screenProps } = this.props;
    // console.log("console 2");
    for (var i = 0; i < this.state.commentsArr.length; i++) {
      firebase
        .database()
        .ref(
          "app/" +
            screenProps.user.CommunityName +
            "/Event details/" +
            this.state.commentsArr[i] +
            "/Comments/"
        )
        .orderByKey()
        .on(
          "child_added",
          function(snap) {
            if (snap.val().Id === this.state.UserId) {
              // console.log(snap.val().text);
              firebase
                .database()
                .ref(
                  "app/" +
                    screenProps.user.CommunityName +
                    "/Event details/" +
                    this.state.commentsArr[i] +
                    "/Comments/" +
                    snap.key
                )
                .remove();
            }
          }.bind(this)
        );
    }

    console.log("deleteComments_Ended");
  }

  deletePosts() {
    console.log("deletePosts_Started");
    var index1 = 0;
    var { navigation } = this.props;
    var { screenProps } = this.props;
    let postsArrLocal = [];
    let userLocal = this.state.UserId;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Event details/")
      .orderByKey()
      .limitToLast(1)
      .on(
        "child_added",
        function(snap) {
          this.setState({ lastestPostKey: snap.key }, () => {
            firebase
              .database()
              .ref("app/" + screenProps.user.CommunityName + "/Event details/")
              .on(
                "child_added",
                function(snapshot) {
                  if (snapshot.val().UserId === userLocal) {
                    postsArrLocal[index1] = snapshot.key;
                    index1++;
                  }
                  if (snapshot.key === this.state.lastestPostKey) {
                    this.setState({ postsArr: postsArrLocal }, () => {
                      for (var i = 0; i < postsArrLocal.length; i++) {
                        // console.log(
                        // 	postsArrLocal[i]
                        // );
                        firebase
                          .database()
                          .ref(
                            "app/" +
                              screenProps.user.CommunityName +
                              "/Event details/" +
                              this.state.postsArr[i]
                          )
                          .remove();
                      }
                    });
                    return;
                  }
                }.bind(this)
              );
          });
        }.bind(this)
      );
    console.log("deletePosts_Ended");
  }

  deleteUser() {
    console.log("deleteUser_Started");
    var { screenProps } = this.props;
    let mobilelocal = this.state.mobileNo;
    let nameLocal = this.state.Name;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/User/")
      .orderByKey()
      .equalTo(this.state.UserId)
      .on(
        "child_added",
        function(snapshot) {
          // console.log(snapshot.key);
          firebase
            .database()
            .ref(
              "app/" +
                screenProps.user.CommunityName +
                "/User/" +
                this.state.UserId
            )
            .remove();
          firebase
            .database()
            .ref("app/" + screenProps.user.CommunityName + "/Blocked_Users")
            .push({
              Blocked_Number: mobilelocal,
              Name: nameLocal
            });
        }.bind(this)
      );
    console.log("deleteUser_Ended");
    this.props.navigation.navigate("HomeNavigator");
  }
  handlenavigation() {
    const { navigate } = this.props.navigation;
    navigate("Profile", {
      returnData: this.returnData.bind(this),
      returnData1: this.returnData1.bind(this)
    });
  }

  getAdminsfromfirebase() {
    let arr1 = [];
    var d = new Date();
    var { screenProps } = this.props;
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/Admins")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        for (var i in arr) {
          result.push(arr[i]);
        }
        arr1.push(result[1].toString());
        console.log("Admins are " + JSON.stringify(arr1));
        this.setState({ Admins: arr1 }, () => {
          this.checkAdmin();
        });
        this.setState({ isLoading: false });
      });
  }
  goback1() {
    // const { navigate } = this.props.navigation;
    // navigate("Info");
    this.setState({ businessStatus: false });
  }

  getData(userId) {
    var { screenProps } = this.props;
    console.log("hellloopxxxx" + userId);
    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/User/" + userId)
      .once("value", data => {
        var value = data.toJSON();
        console.log("----" + value.Profession);
       // console.log("heheheh----" + JSON.stringify(value));
        this.setState({ Name: value.Name });
        this.setState({ txtvalue: value.Email });
        this.setState({ imageurl: value.Profile_photo });
        this.setState({ profession: value.Profession });
        this.setState({ mobileNo: value.Contact_Number },()=>{this.checkProfileAdmin();
        });
        console.log("----" + value.Profession);
        //this.checkProfileAdmin();
        console.log("-----gegeggeg" + this.state.Gender);
        this.setState({ Gender: value.Gender });
        this.setState({ BloodGroup: value.Blood_Group });
        this.setState({ country: value.Country });
        this.setState({ states: value.State });
        this.setState({ city: value.City });

        this.setState({ addr_line1: value.Address_line1 });
        if (data.toJSON().Matrimonial != null) {
          this.setState({ Fname: data.toJSON().Matrimonial.Fathers_Name });
          this.setState({ Mname: data.toJSON().Matrimonial.Mothers_Name });
          this.setState({ date: data.toJSON().Matrimonial.DOB });
          this.setState({
            Education: data.toJSON().Matrimonial.Highest_Qualification
          });
          this.setState({
            MaritalStatus: data.toJSON().Matrimonial.Marital_Status
          });
          this.setState({ height: data.toJSON().Matrimonial.Height });
          this.setState({ weight: data.toJSON().Matrimonial.Weight });
          this.setState({ time: data.toJSON().Matrimonial.Birth_time });
          this.setState({ Salary: data.toJSON().Matrimonial.Salary });
          this.setState({ Hobbies: data.toJSON().Matrimonial.Hobbies });
          this.setState({ BirthPlace: data.toJSON().Matrimonial.Birth_Place });
        //  console.log("eeee" + data.toJSON().Matrimonial.Fathers_Name);
        }
      });
    firebase
      .database()
      .ref(
        "app/" +
          screenProps.user.CommunityName +
          "/User/" +
          userId +
          "/Business_details"
      )
      .once("value", data => {
        var bval = data.toJSON();
        this.setState({ BusinessCategory: bval.Category });
        this.setState({ BusinessName: bval.Name });
        this.setState({ BusinessMobileNo: bval.Contact_Number });
        this.setState({ Type: bval.Type });
        this.setState({ businessAddr_line1: bval.Address_line1 });
        this.setState({ businessAddr_line2: bval.Address_line2 });
      });
  }

  render() {
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
          <Text style={styles.home}>Info</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              title=""
              onPress={this.shareToWhatsAppWithContact.bind(this)}
              style={{
                backgroundColor: "#25d366",
                // padding: 3,
                paddingHorizontal: 6,
                borderRadius: 30
              }}
            >
              <Icon
                name="whatsapp"
                color="white"
                type="font-awesome"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ padding: 10, paddingBottom: 100 }}>
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
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "stretch"
              }}
            >
              <View style={{ flex: 1, padding: 1 }}>
                <Button
                  color="#C60C31"
                  title="Info"
                  onPress={() => this.props.navigation.navigate("Info")}
                />
              </View>

              <View style={{ flex: 1, padding: 1 }}>
                <Button
                  color="#f2264f"
                  title="Posts"
                  onPress={() =>
                    this.props.navigation.navigate("UserPosts", {
                      UserId: this.state.UserId,
                      imageurl: this.state.imageurl
                    })
                  }
                />
              </View>
            </View>
            <View>
              <View>
                <View style={{ paddingVertical: 10, paddingBottom: 100 }}>
                  <TouchableOpacity onPress={this.setPersonalInfo.bind(this)}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderWidth: 0.5,
                        borderRadius: 5
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "lucida grande",
                          fontWeight: "bold"
                        }}
                      >
                        Personal Info
                      </Text>
                      <Icon
                        name={this.state.PersonalIconStatus}
                        color="black"
                        type="antdesign"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                  {renderIf(this.state.PersonalInfo)(
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
                          onChangeText={profession =>
                            this.setState({ profession })
                          }
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
                          style={{
                            backgroundColor: "transparent",
                            width: "100%"
                          }}
                          placeholder="Mobile number"
                          onChangeText={mobileNo => this.setState({ mobileNo })}
                          value={this.state.mobileNo}
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
                          onChangeText={Blood_Group =>
                            this.setState({ Blood_Group })
                          }
                          value={this.state.BloodGroup}
                        />
                      </View>
                      <View>
                        <TextInput
                          label="address line 1"
                          editable={false}
                          disabled={true}
                          style={{
                            backgroundColor: "transparent",
                            width: "100%"
                          }}
                          placeholder="Address line 1"
                          onChangeText={addr_line1 =>
                            this.setState({ addr_line1 })
                          }
                          value={this.state.addr_line1}
                        />
                      </View>
                      <View style={{ padding: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="country"
                          labelColor="#676261"
                          value={this.state.country}
                        />
                      </View>

                      <View style={{ padding: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="state"
                          labelColor="#676261"
                          value={this.state.states}
                        />
                      </View>

                      <View style={{ padding: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="city"
                          labelColor="#676261"
                          value={this.state.city}
                        />
                      </View>
                      {/* <View style={{ paddingBottom: 100 }}>
                          <Button
                            onPress={this.businessDetails.bind(this)}
                            title="Business Details"
                            color="#C60C31"
                          />
						</View> */}
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={this.setMatrimonialInfo.bind(this)}
                  >
                    <View
                      style={{
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderWidth: 0.5,
                        borderRadius: 5
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "lucida grande",
                          fontWeight: "bold"
                        }}
                      >
                        Matrimonial Info
                      </Text>
                      <Icon
                        name={this.state.MatrimonialIconStatus}
                        color="black"
                        type="antdesign"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                  {renderIf(this.state.MatrimonialInfo)(
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontFamily: "lucida grande",
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "#676261",
                            paddingTop: 10,
                            justifyContent: "center",
                            paddingLeft: 10
                          }}
                        >
                          Date of Birth :
                        </Text>
                        <DatePicker
                          disabled={true}
                          editable={false}
                          style={{ width: 200, paddingLeft: 20 }}
                          date={this.state.date}
                          mode="date"
                          placeholder="select date"
                          format="DD-MM-YYYY"
                          maxDate={this.state.maxdate}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          onDateChange={date => {
                            //console.log("aaaaaaa----" + date),
                              this.setState({ date: date });
                          }}
                        />
                      </View>

                      <View style={{ flexDirection: "row", paddingTop: 5 }}>
                        <Text
                          style={{
                            fontFamily: "lucida grande",
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "#676261",
                            paddingTop: 10,
                            justifyContent: "center",
                            paddingLeft: 10
                          }}
                        >
                          Time of Birth :
                        </Text>
                        <DatePicker
                          disabled={true}
                          editable={false}
                          style={{ width: 200, paddingLeft: 20 }}
                          date={this.state.time}
                          mode="time"
                          placeholder="select time"
                          format="h:mm:ss"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          onDateChange={time => {
                           // console.log("aaaaaaa----" + time),
                              this.setState({ time: time });
                          }}
                        />
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <TextInput
                          disabled={true}
                          editable={false}
                          label="Birth Place"
                          placeholder="Birth Place"
                          maxLength={40}
                          placeholderTextColor="#676261"
                          onChangeText={BirthPlace =>
                            this.setState({ BirthPlace })
                          }
                          value={this.state.BirthPlace}
                          style={{
                            backgroundColor: "transparent",
                            borderBottomColor: "#908a89",
                            borderBottomWidth: 0.5,
                            paddingTop: 10,
                            paddingBottom: 5,
                            fontSize: 16
                          }}
                          placeholderTextColor="#908a89"
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingTop: 15
                        }}
                      >
                        <TextInput
                          disabled={true}
                          editable={false}
                          style={{
                            borderColor: "#908a89",
                            borderWidth: 0.5,
                            fontSize: 12,
                            width: win.width / 2 - 20,
                            backgroundColor: "white"
                          }}
                          keyboardType="numeric"
                          maxLength={200}
                          placeholder="Height"
                          // placeholder={"Your problem description"}
                          placeholderTextColor="#908a89"
                          onChangeText={height => this.setState({ height })}
                          editable={true}
                          // value={this.state.descInput.slice(0, 200)}
                          value={this.state.height}
                        />
                        <TextInput
                          disabled={true}
                          editable={false}
                          style={{
                            borderColor: "#908a89",
                            borderWidth: 0.5,
                            fontSize: 12,
                            width: win.width / 2 - 20,
                            backgroundColor: "white"
                          }}
                          keyboardType="numeric"
                          maxLength={200}
                          placeholder="weight"
                          // placeholder={"Your problem description"}
                          placeholderTextColor="#908a89"
                          onChangeText={weight => this.setState({ weight })}
                          editable={true}
                          // value={this.state.descInput.slice(0, 200)}
                          value={this.state.weight}
                        />
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <TextInput
                          disabled={true}
                          editable={false}
                          label="Father's Name"
                          placeholder="Father's Name"
                          maxLength={40}
                          placeholderTextColor="#676261"
                          onChangeText={Fname => this.setState({ Fname })}
                          value={this.state.Fname}
                          style={{
                            backgroundColor: "transparent",
                            borderBottomColor: "#908a89",
                            borderBottomWidth: 0.5,
                            paddingTop: 10,
                            paddingBottom: 5,
                            fontSize: 16
                          }}
                          placeholderTextColor="#908a89"
                        />
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <TextInput
                          disabled={true}
                          editable={false}
                          label="Mother's Name"
                          placeholder="Mother's Name"
                          maxLength={40}
                          placeholderTextColor="#676261"
                          onChangeText={Mname => this.setState({ Mname })}
                          value={this.state.Mname}
                          style={{
                            backgroundColor: "transparent",
                            borderBottomColor: "#908a89",
                            borderBottomWidth: 0.5,
                            paddingTop: 10,
                            paddingBottom: 5,
                            fontSize: 16
                          }}
                          placeholderTextColor="#908a89"
                        />
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <TextInput
                          disabled={true}
                          editable={false}
                          label="Hobbies"
                          placeholder="Hobbies"
                          maxLength={40}
                          placeholderTextColor="#676261"
                          onChangeText={Hobbies => this.setState({ Hobbies })}
                          value={this.state.Hobbies}
                          style={{
                            backgroundColor: "transparent",
                            borderBottomColor: "#908a89",
                            borderBottomWidth: 0.5,
                            paddingTop: 10,
                            paddingBottom: 5,
                            fontSize: 16
                          }}
                          placeholderTextColor="#908a89"
                        />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="Marital Status"
                          labelColor="#676261"
                          // data={data}
                          onChangeText={MaritalStatus =>
                            this.setState({ MaritalStatus })
                          }
                          value={this.state.MaritalStatus}
                        />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="Highest Qualification"
                          labelColor="#676261"
                          //  data={data1}
                          onChangeText={Education =>
                            this.setState({ Education })
                          }
                          value={this.state.Education}
                        />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Dropdown
                          disabled={true}
                          label="Salary"
                          labelColor="#676261"
                          //  data={data2}
                          onChangeText={Salary => this.setState({ Salary })}
                          value={this.state.Salary}
                        />
                      </View>
                      {/* <View
              style={{ paddingBottom: 100, alignSelf: "center", padding: 20 }}
            >
              <Button
                onPress={this.SaveMatrimonialData.bind(this)}
                title="Save"
                color="#C60C31"
                //style={styles.search}
              />
            </View> */}
                    </View>
                  )}
                  <TouchableOpacity onPress={this.setBusinessInfo.bind(this)}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderWidth: 0.5,
                        borderRadius: 5
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "lucida grande",
                          fontWeight: "bold"
                        }}
                      >
                        Business Info
                      </Text>
                      <Icon
                        name={this.state.BusinessIconStatus}
                        color="black"
                        type="antdesign"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>

                  {renderIf(this.state.BusinessInfo)(
                    <View>
                      <View>
                        <TextInput
                          label="Business Name"
                          editable={false}
                          disabled={true}
                          placeholder="Business Name"
                          placeholderTextColor="#676261"
                          onChangeText={BusinessName =>
                            this.setState({ BusinessName })
                          }
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
                          style={{
                            backgroundColor: "transparent",
                            width: "100%"
                          }}
                          placeholder="Business mobile number"
                          onChangeText={BusinessMobileNo =>
                            this.setState({ BusinessMobileNo })
                          }
                          value={this.state.BusinessMobileNo}
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
                      <View style={{ padding: 10, paddingBottom: 10 }}>
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
                      <View style={{ padding: 5 }}>
                        <TextInput
                          label="Business address line 1"
                          editable={false}
                          disabled={true}
                          placeholder="Business Address"
                          onChangeText={businessAddr_line1 =>
                            this.setState({ businessAddr_line1 })
                          }
                          value={this.state.businessAddr_line1}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </View>
                      <View style={{ padding: 5 }}>
                        <TextInput
                          label="Business address line 2"
                          editable={false}
                          disabled={true}
                          placeholder="Business Address"
                          onChangeText={businessAddr_line2 =>
                            this.setState({ businessAddr_line2 })
                          }
                          value={this.state.businessAddr_line2}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {renderIf(this.state.isAdmin && !this.state.isProfileAdmin)(
              <View
                style={{
                  padding: 10
                }}
              >
                <Button
                  onPress={this.masterDeleter.bind(this)}
                  title="Delete User"
                  color="#C60C31"
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
