import React, { Component } from "react";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage,
  BackHandler,
  Linking,
  Dimensions
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import styles from "./InfoStyle";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs";
import renderIf from "../../components/ViewFeed/renderIf";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const win = Dimensions.get("window");
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
      businessAddr_line2: "",
      UserId: "",
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
    var { screenProps } = this.props;
    screenProps.user.screenName = "Info";
    this.setState({ UserId: screenProps.user.id });

    var d = new Date();
    var d1 = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    console.log("aaaa" + d1);
    this.setState({ maxdate: d1 });
    this.getData();
  }
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
  logout() {
    AsyncStorage.removeItem("token");
    this.props.navigation.navigate("Login");
  }
  goback1() {
    const { navigate } = this.props.navigation;
    navigate("Info");
    this.setState({ businessStatus: false });
  }
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
	Address_line1,
	Mname,
	Fname,
	Education,
	MaritalStatus,
	maxdate,
	time,
	Salary,
	height,
	weight,
	Hobbies,
	BirthPlace
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
      addr_line1: Address_line1,
	  isAdmin: false,
	  Mname: Mname,
      Fname: Fname,
      Education:Education,
      MaritalStatus: MaritalStatus,
      maxdate: maxdate,
      time: time,
      Salary: Salary,
      height: height,
      weight: weight,
      Hobbies:Hobbies,
      BirthPlace:BirthPlace
	  
    });
  }
  returnData1(name, mobile, type, Category, Address_line1, Address_line2) {
    this.setState({
      BusinessName: name,
      BusinessMobileNo: mobile,
      Type: type,
      BusinessCategory: Category,
      businessAddr_line1: Address_line1,
      businessAddr_line2: Address_line2
    });
  }

  getData() {
    var { screenProps } = this.props;
    console.log("aaaa-----" + screenProps.user.id);
    console.log(screenProps.user.CommunityName);
    firebase
      .database()
      .ref(
        "app/" + screenProps.user.CommunityName + "/User/" + screenProps.user.id
      )
      .once("value", data => {
        var value = data.toJSON();
        console.log("----" + value.Profession);

        console.log("------" + value.Contact_Number);
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
          console.log("eeee" + data.toJSON().Matrimonial.Fathers_Name);
        }
      });
    firebase
      .database()
      .ref(
        "app/" +
          screenProps.user.CommunityName +
          "/User/" +
          screenProps.user.id +
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

        console.log("hehheheheheh----" + this.state.BusinessMobileNo);
      });
  }

  render() {
    // if (this.state.businessStatus) {
    //   console.log("Businessstatus" + this.state.businessStatus);
    //   return (
    //     <View>
    //       <View style={styles.header}>
    //         <View>
    //           <TouchableOpacity title="" onPress={this.goback1.bind(this)}>
    //             <Icon name="arrow-back" color="white" size={30} />
    //           </TouchableOpacity>
    //         </View>
    //         <Text style={styles.home}>Business Details</Text>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             justifyContent: "space-between"
    //           }}
    //         />
    //       </View>
    //       <ScrollView style={{ padding: 10 }}>
    //         <View>
    //           <View>
    //             <TextInput
    //               label="Business Name"
    //               editable={false}
    //               disabled={true}
    //               placeholder="Business Name"
    //               placeholderTextColor="#676261"
    //               onChangeText={BusinessName => this.setState({ BusinessName })}
    //               value={this.state.BusinessName}
    //               style={{ backgroundColor: "transparent" }}
    //             />
    //           </View>
    //           <View>
    //             <TextInput
    //               label="Business mobile number"
    //               editable={false}
    //               disabled={true}
    //               ref="mobileNo"
    //               keyboardType="phone-pad"
    //               style={{
    //                 backgroundColor: "transparent",
    //                 width: "100%"
    //               }}
    //               placeholder="Business mobile number"
    //               onChangeText={BusinessMobileNo =>
    //                 this.setState({ BusinessMobileNo })
    //               }
    //               value={this.state.BusinessMobileNo}
    //             />
    //           </View>

    //           <View>
    //             <TextInput
    //               label="Business type"
    //               editable={false}
    //               disabled={true}
    //               placeholder="Business type "
    //               onChangeText={Type => this.setState({ Type })}
    //               value={this.state.Type}
    //               style={{ backgroundColor: "transparent" }}
    //             />
    //           </View>
    //           <View style={{ padding: 10, paddingBottom: 10 }}>
    //             <Dropdown
    //               disabled={true}
    //               label="Business Category"
    //               labelColor="#676261"
    //               onChangeText={BusinessCategory =>
    //                 this.setState({ BusinessCategory })
    //               }
    //               value={this.state.BusinessCategory}
    //             />
    //           </View>
    //           <View style={{ padding: 5 }}>
    //             <TextInput
    //               label="Business address line 1"
    //               editable={false}
    //               disabled={true}
    //               placeholder="Business Address"
    //               onChangeText={businessAddr_line1 =>
    //                 this.setState({ businessAddr_line1 })
    //               }
    //               value={this.state.businessAddr_line1}
    //               style={{ backgroundColor: "transparent" }}
    //             />
    //           </View>
    //           <View style={{ padding: 5 }}>
    //             <TextInput
    //               label="Business address line 2"
    //               editable={false}
    //               disabled={true}
    //               placeholder="Business Address"
    //               onChangeText={businessAddr_line2 =>
    //                 this.setState({ businessAddr_line2 })
    //               }
    //               value={this.state.businessAddr_line2}
    //               style={{ backgroundColor: "transparent" }}
    //             />
    //           </View>
    //         </View>
    //       </ScrollView>
    //     </View>
    //   );
    // }

    return (
      <View>
        <View style={styles.header}>
          <View>
            {/* <TouchableOpacity
              title=""
              onPress={this.businessDetails.bind(this)}
            >
              <Icon
                name="briefcase"
                type="font-awesome"
                color="white"
                size={30}
              />
            </TouchableOpacity> */}
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
              onPress={this.handlenavigation.bind(this)}
            >
              <Icon name="edit" color="white" size={30} />
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
                    this.props.navigation.navigate("MyPosts", {
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
                            console.log("aaaaaaa----" + date),
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
                            console.log("aaaaaaa----" + time),
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
          </View>
        </ScrollView>
      </View>
    );
  }
}
