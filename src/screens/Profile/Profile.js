import React, { Component } from "react";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import styles from "./ProfileStyle";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs";
import renderIf from "../../components/ViewFeed/renderIf";
import DatePicker from "react-native-datepicker";
const win = Dimensions.get("window");
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryArray: [],
      stateArray: [],
      cityArray: [],
      city: [],
      country: "",
      states: "",
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
      key1: "",
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
    this.setState({ UserId: screenProps.user.id });
    this.getData();
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({ loadstatus: true });
        let source = { uri: response.uri };

        this.uploadImage(response.uri, "image/png", "hello");
        console.log("response.uri:--" + response.uri);
      }
    });
  }
  uploadImage = (uri, mime = "image/png") => {
    return new Promise((resolve, reject) => {
      var storage = firebase.storage();
      console.log(storage);
      const uploadUri = uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = storage.ref("images").child(`${sessionId}`);
      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          this.setState({ imageurl: url });
          this.setState({ imageurl: url });
          this.setState({ loadstatus: false });
          console.log("ooooooo----" + this.state.imageurl);
          console.log("-----------------");
          resolve(url);
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }).catch(error => {
      reject(error);
    });
  };
  businessDetails() {
    this.setState({ businessStatus: true });
  }

  goback() {
    const { navigate } = this.props.navigation;
    navigate("Info");
  }

  goback1() {
    const { navigate } = this.props.navigation;
    navigate("Profile");
    this.setState({ businessStatus: false });
  }

  validate() {
    let text = this.state.txtvalue;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      this.setState({ email: text });
      console.log("Email is Correct");
      return true;
    }
  }

  hasNumber(num) {
    var regex = /\d/g;
    return regex.test(num);
  }

  updateBusinessdetails() {
    var { screenProps } = this.props;
    let text1 = this.state.BusinessMobileNo;
    if (!this.mobilevalidate(text1)) {
      alert("mobile is incorrect");
    } else {
      firebase
        .database()
        .ref(
          "app/" +
            screenProps.user.CommunityName +
            "/User/" +
            screenProps.user.id +
            "/Business_details"
        )
        .update({
          Contact_Number: this.state.BusinessMobileNo,
          Name: this.state.BusinessName,
          Category: this.state.BusinessCategory,
          Type: this.state.Type,
          Address_line1: this.state.businessAddr_line1,
          Address_line2: this.state.businessAddr_line2
        });
      this.props.navigation.state.params.returnData1(
        this.state.BusinessName,
        this.state.BusinessMobileNo,
        this.state.Type,
        this.state.BusinessCategory,
        this.state.businessAddr_line2,
        this.state.businessAddr_line1
      );
      this.updateData();
    }
  }
  getData() {
    var { screenProps } = this.props;

    firebase
      .database()
      .ref(
        "app/" + screenProps.user.CommunityName + "/User/" + screenProps.user.id
      )
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


      firebase
      .database()
      .ref(
        "app/" + screenProps.user.CommunityName + "/User/" + screenProps.user.id
      )
      .once("value", data => {
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
          this.setState({height:data.toJSON().Matrimonial.Height})
          this.setState({weight:data.toJSON().Matrimonial.Weight})
          this.setState({time:data.toJSON().Matrimonial.Birth_time})
          this.setState({Salary:data.toJSON().Matrimonial.Salary})
          this.setState({Hobbies:data.toJSON().Matrimonial.Hobbies})
          this.setState({BirthPlace:data.toJSON().Matrimonial.Birth_Place})
          console.log("eeee" + data.toJSON().Matrimonial.Fathers_Name);
        }
      });
    var arry1 = [];
    firebase
      .database()
      .ref("app/country")
      .on("child_added", data => {
        console.log(data.key);
        console.log(
          "aaaaaaaaaaaaaaaaaadddddddddddddaaaaa" +
            JSON.stringify(data.toJSON().name)
        );
        arry1.push({
          nameid: data.key,
          value: data.toJSON().name
        });

        this.setState({ countryArray: arry1 });
      });
  }

  handleChangeText = countryy => {
    this.setState({ country: countryy, states: "", city: "" }, () =>
      this.findstate()
    );
  };

  handleChangeText1 = statess => {
    this.setState({ states: statess, city: "" }, () => this.findcity());
  };
  handleChangeText2 = city1 => {
    this.setState({ city: city1 });
  };

  findstate() {
    this.state.countryArray.filter(search => {
      if (search.value == this.state.country) {
        this.setState({ key1: search.nameid }, () => {
          console.log("sjsjk---" + this.state.key1);
          var arr2 = [];
          firebase
            .database()
            .ref("app/country/" + this.state.key1 + "/states")
            .on("child_added", data => {
              console.log("-----ssss-" + JSON.stringify(data.key));
              arr2.push({
                value: data.key
              });

              this.setState({ stateArray: arr2 });
            });
        });
      }
    });
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

  findcity() {
    this.state.stateArray.filter(search => {
      if (search.value == this.state.states) {
        var arr3 = [];
        firebase
          .database()
          .ref(
            "app/country/" + this.state.key1 + "/states/" + this.state.states
          )
          .on("child_added", data => {
            console.log("CITYYYYYYYYYYYYY" + JSON.stringify(data.val()));
            arr3.push({
              value: data.val()
            });

            this.setState({ cityArray: arr3 });
          });
      }
    });
  }

  updateData() {
    var { screenProps } = this.props;

    let text = this.state.mobileNo;
    let name = this.state.Name;
    if (!this.validate()) {
      alert("Email format is incorrect");
    } else if (!this.mobilevalidate(text)) {
      alert("mobile no is incorrect");
    } else if (this.state.Name.trim().length == 0) {
      alert("Please enter your name");
    } else if (this.hasNumber(name)) {
      alert("Name cannot contain numeric/special characters");
    } else {
      firebase
        .database()
        .ref(
          "app/" +
            screenProps.user.CommunityName +
            "/User/" +
            screenProps.user.id
        )
        .update({
          Name: this.state.Name,
          Email: this.state.txtvalue,
          Profile_photo: this.state.imageurl,
          Profession: this.state.profession,
          Gender: this.state.Gender,
          Blood_Group: this.state.BloodGroup,
          Contact_Number: this.state.mobileNo,
          Country: this.state.country,
          City: this.state.city,
          State: this.state.states,
          Address_line1: this.state.addr_line1

        });


        firebase
      .database()
      .ref(
        "app/" +
          screenProps.user.CommunityName +
          "/User/" +
          screenProps.user.id +
          "/Matrimonial" 
      )
      .update({
        DOB: this.state.date,
        Marital_Status: this.state.MaritalStatus,
        Mothers_Name: this.state.Mname,
        Fathers_Name: this.state.Fname,
        Highest_Qualification: this.state.Education,
        Birth_time: this.state.time,
        Height: this.state.height,
        Weight: this.state.weight,
        Hobbies: this.state.Hobbies,
        Salary:this.state.Salary,
        Birth_Place:this.state.BirthPlace
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
        .update({
          Contact_Number: this.state.BusinessMobileNo,
          Name: this.state.BusinessName,
          Category: this.state.BusinessCategory,
          Type: this.state.Type,
          Address_line1: this.state.businessAddr_line1,
          Address_line2: this.state.businessAddr_line2
        });
      this.props.navigation.state.params.returnData1(
        this.state.BusinessName,
        this.state.BusinessMobileNo,
        this.state.Type,
        this.state.BusinessCategory,
        this.state.businessAddr_line2,
        this.state.businessAddr_line1
      );
      this.props.navigation.state.params.returnData(
        this.state.Name,
        this.state.txtvalue,
        this.state.imageurl,
        this.state.mobileNo,
        this.state.Gender,
        this.state.BloodGroup,
        this.state.profession,
        this.state.country,
        this.state.states,
        this.state.city,
        this.state.addr_line1,

        this.state.date,
        this.state.MaritalStatus,
         this.state.Mname,
        this.state.Fname,
       this.state.Education,
       this.state.time,
        this.state.height,
        this.state.weight,
         this.state.Hobbies,
        this.state.Salary,
        this.state.BirthPlace,
        this.state.BusinessName,
        this.state.BusinessMobileNo,
        this.state.Type,
        this.state.BusinessCategory,
        this.state.businessAddr_line2,
        this.state.businessAddr_line1
      );
      this.goback();
    }
  }
  mobilevalidate(text) {
    const reg = /^[0]?[123456789]\d{11}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let ddata2 = [
      {
        value: "below 1 lac"
      },
      {
        value: "1 - 5 lacs"
      },
      {
        value: "6 - 10 lacs"
      },
      {
        value: "11 - 15 lacs"
      },
      {
        value: "above 16 lacs"
      }
    ];
    let ddata1 = [
      {
        value: "Below Matriculation"
      },

      {
        value: "Matriculation"
      },
      {
        value: "Higher Secondary"
      },

      {
        value: "Graduate"
      },
      {
        value: "Post-Graduate"
      },
      {
        value: "Doctorate"
      }
    ];
    let ddata = [
      {
        value: "Single"
      },
      {
        value: "Married"
      },
      {
        value: "Divorced"
      },
      {
        value: "Widowed"
      }
    ];
    let data = [
      {
        value: "Female"
      },
      {
        value: "Male"
      },
      {
        value: "Other"
      }
    ];
    let data1 = [
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

    let data7 = [
      {
        value: "None"
      },
      {
        value: "Wholesale"
      },
      {
        value: "Retail"
      },
      {
        value: "Production"
      }
    ];
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
          <Text style={styles.home}>Edit profile</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity title="" onPress={this.updateData.bind(this)}>
              <Icon name="done" color="white" size={30} />
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

                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={{ fontFamily: "lucida grande" }}>
                    {" "}
                    Edit Photo{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 20 }} />
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
                    placeholder="Name"
                    maxLength={20}
                    placeholderTextColor="#676261"
                    onChangeText={Name => this.setState({ Name })}
                    value={this.state.Name}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Email ID"
                    placeholder="Email ID"
                    onChangeText={txtvalue => this.setState({ txtvalue })}
                    value={this.state.txtvalue}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Profession"
                    placeholder="Profession"
                    maxLength={40}
                    placeholderTextColor="#676261"
                    onChangeText={profession => this.setState({ profession })}
                    value={this.state.profession.slice(0, 40)}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Mobile number"
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
                    label="Gender"
                    labelColor="#676261"
                    data={data}
                    onChangeText={Gender => this.setState({ Gender })}
                    value={this.state.Gender}
                  />
                </View>

                <View>
                  <TextInput
                    label="address line 1"
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    maxLength={100}
                    placeholder="Address line 1"
                    onChangeText={addr_line1 => this.setState({ addr_line1 })}
                    value={this.state.addr_line1.slice(0, 100)}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Dropdown
                    label="country"
                    labelColor="#676261"
                    data={this.state.countryArray}
                    onChangeText={this.handleChangeText.bind(this)}
                    value={this.state.country}
                  />
                </View>

                <View style={{ padding: 10 }}>
                  <Dropdown
                    label="state"
                    labelColor="#676261"
                    data={this.state.stateArray}
                    onChangeText={this.handleChangeText1.bind(this)}
                    value={this.state.states}
                  />
                </View>

                <View style={{ padding: 10 }}>
                  <Dropdown
                    label="city"
                    labelColor="#676261"
                    data={this.state.cityArray}
                    onChangeText={this.handleChangeText2.bind(this)}
                    value={this.state.city}
                  />
                </View>

                <View style={{ padding: 10, paddingBottom: 90 }}>
                  <Dropdown
                    label="Bloodgroup"
                    labelColor="#676261"
                    data={data1}
                    onChangeText={BloodGroup => this.setState({ BloodGroup })}
                    value={this.state.BloodGroup}
                  />
                </View>

                <View style={{ paddingBottom: 100 }}>
                  <Button
                    onPress={this.businessDetails.bind(this)}
                    title="Business Details"
                    color="#C60C31"
                    //accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </View>
            )}

            

            <TouchableOpacity onPress={this.setMatrimonialInfo.bind(this)}>
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
                    label="Birth Place"
                    placeholder="Birth Place"
                    maxLength={40}
                    placeholderTextColor="#676261"
                    onChangeText={BirthPlace => this.setState({ BirthPlace })}
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
                {/* <View style={{ padding: 10 }}>
              <TextInput
                label="Education"
                placeholder="Education"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={title => this.setState({ title })}
                value={this.state.Education}
                style={{
                  backgroundColor: "transparent",
                  borderBottomColor: "#908a89",
                  borderBottomWidth: 0.5,
                  paddingTop:20,
                  paddingBottom:5,
                  fontSize:16
                }}
                placeholderTextColor="#908a89"
              />
            </View> */}
                <View style={{ paddingRight: 10 }}>
                  <TextInput
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
                    label="Marital Status"
                    labelColor="#676261"
                    data={ddata}
                    onChangeText={MaritalStatus =>
                      this.setState({ MaritalStatus })
                    }
                    value={this.state.MaritalStatus}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Dropdown
                    label="Highest Qualification"
                    labelColor="#676261"
                    data={ddata1}
                    onChangeText={Education => this.setState({ Education })}
                    value={this.state.Education}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Dropdown
                    label="Salary"
                    labelColor="#676261"
                    data={ddata2}
                    onChangeText={Salary => this.setState({ Salary })}
                    value={this.state.Salary}
                  />
                </View>
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
                    placeholder="Business Name"
                    placeholderTextColor="#676261"
                    maxLength={20}
                    onChangeText={BusinessName =>
                      this.setState({ BusinessName })
                    }
                    value={this.state.BusinessName.slice(0, 20)}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Business mobile number"
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
                <View style={{ padding: 10 }}>
                  <Dropdown
                    label="Business Category"
                    labelColor="#676261"
                    data={data7}
                    onChangeText={BusinessCategory =>
                      this.setState({ BusinessCategory })
                    }
                    value={this.state.BusinessCategory}
                  />
                </View>
                <View style={{ paddingBottom: 10 }}>
                  <TextInput
                    label="Business type"
                    placeholder="Business type"
                    maxLength={100}
                    onChangeText={Type => this.setState({ Type })}
                    value={this.state.Type.slice(0, 100)}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Business address line 1"
                    placeholder="Business Address"
                    maxLength={100}
                    onChangeText={businessAddr_line1 =>
                      this.setState({ businessAddr_line1 })
                    }
                    value={this.state.businessAddr_line1.slice(0, 100)}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
                <View>
                  <TextInput
                    label="Business address line 2"
                    placeholder="Business Address"
                    maxLength={100}
                    onChangeText={businessAddr_line2 =>
                      this.setState({ businessAddr_line2 })
                    }
                    value={this.state.businessAddr_line2.slice(0, 100)}
                    style={{ backgroundColor: "transparent" }}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
