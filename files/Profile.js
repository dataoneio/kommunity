import React, { Component } from "react";
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
  Image,
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
export default class Profile extends React.Component {
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
      Type: ""
    };
  }
  componentDidMount() {
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
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.uploadImage(response.uri, "image/png", "hello");
        console.log("response.uri:--" + response.uri);
        // this.setState({
        //   //   loadstatus: false,
        //   ImageSource: source
        // });
      }
    });
  }
  uploadImage = (uri, mime = "image/png") => {
    return new Promise((resolve, reject) => {
      var storage = firebase.storage();
      console.log(storage);
      const uploadUri = uri;
      const sessionId = new Date().getTime();
      //console.log("------"+sessionId);
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

          //var i=imageRef.getDownloadURL();

          //console.log("iii-----");
          return imageRef.getDownloadURL();
        })
        .then(url => {
          //console.log("----"+url);

          this.setState({ imageurl: url });
          // console.log(" -------  " + this.state.uurl),
          // console.log("uid1:---" + this.state.uid1);
          // firebase
          //   .database()
          //   .ref("user/" + this.state.uid1)
          //   .update({
          //     url1: url
          //   });
          this.setState({ imageurl: url });
          this.setState({ loadstatus: false });
          console.log("ooooooo----" + this.state.imageurl);
          console.log("-----------------");
          resolve(url);
        })
        .then(function() {
          console.log("Document successfully written!");
          //console.log("--------"+(this.state.uurl));
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      // resolve(url);
    }).catch(error => {
      reject(error);
    });
    // console.log(" sudid=--------"+imageRef.getDownloadURL());
  };
  businessDetails() {
    this.setState({ businessStatus: true });
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  goback() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  goback1() {
    const { navigate } = this.props.navigation;
    navigate("Profile");
    this.setState({ businessStatus: false });
  }

  validate() {
    let text = this.state.txtvalue;
    console.log("olololololololo" + text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      //  alert("Email format is incorrect");
      //this.setState({email:text})
      return false;
    } else {
      this.setState({ email: text });
      // alert("Email format is correct")
      console.log("Email is Correct");
      return true;
      // this.goback();
    }
  }

  hasNumber(num) {
    var regex = /\d/g;
    return regex.test(num);
  }
  // hasSpecialChar(char)
  // {
  //   var regex = /^[^!-\/:-@\[-`{-~]+$/;
  //     return regex.test(char);
  // }

  updateBusinessdetails() {
    firebase
      .database()
      .ref("app/User/ID1/Business_details")
      .update({
        Contact_Number: this.state.BusinessMobileNo,
        Name: this.state.BusinessName,
        Category: this.state.BusinessCategory,
        Type: this.state.Type
      });
    this.props.navigation.navigate("Home");
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
        console.log("hehheheheheh----" + this.state.BusinessMobileNo);
      });
  }

  updateData() {
    let name = this.state.Name;
    if (!this.validate()) {
      alert("Email format is incorrect");
    } else if (this.state.Name.trim().length == 0) {
      alert("name cant be empty");
    } else if (this.hasNumber(name)) {
      alert("name cannot contain numeric/special char");
    } else if (this.state.Gender === undefined) {
      alert("gender required");
    } else if (this.state.BloodGroup === undefined) {
      alert(" BoodGrp required");
    } else {
      firebase
        .database()
        .ref("app/User/ID1")
        .update({
          Name: this.state.Name,
          Email: this.state.txtvalue,
          Profile_photo: this.state.imageurl,
          Profession: this.state.profession,
          Gender: this.state.Gender,
          Blood_Group: this.state.BloodGroup
        });
      this.goback();
    }
  }
  render() {
    const { country, region } = this.state;
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
        value: "Wholesale"
      },
      {
        value: "Retail"
      },
      {
        value: "Production"
      }
    ];
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
              <TouchableOpacity
                title=""
                onPress={this.updateBusinessdetails.bind(this)}
              >
                <Icon name="done" color="white" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{padding:10}}>
            <View>
            <View style={{ padding: 10 }}>
              <TextInput
                placeholder="Business Name"
                placeholderTextColor="#676261"
                onChangeText={BusinessName => this.setState({ BusinessName })}
                value={this.state.BusinessName}
                style={{ backgroundColor: "transparent" }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                ref="mobileNo"
                keyboardType="numeric"
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
            <View style={{ padding: 10, paddingBottom: 50 }}>
              <TextInput
                placeholder="Business type "
                onChangeText={Type => this.setState({ Type })}
                value={this.state.Type}
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
                  style={styles.ImageContainer1}
                  source={{
                    uri: this.state.imageurl
                  }}
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

            <View>
              <View style={{ padding: 10 }}>
                <TextInput
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
              <View style={{ padding: 10 }}>
                <TextInput
                  placeholder="Email ID"
                  onChangeText={txtvalue => this.setState({ txtvalue })}
                  value={this.state.txtvalue}
                  style={{ backgroundColor: "transparent" }}
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

              <View style={{ padding: 10 }}>
                <TextInput
                  placeholder="Profession"
                  placeholderTextColor="#676261"
                  onChangeText={profession => this.setState({ profession })}
                  value={this.state.profession}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Dropdown
                  label="Bloodgroup"
                  labelColor="#676261"
                  data={data1}
                  onChangeText={Blood_Group => this.setState({ Blood_Group })}
                  value={this.state.BloodGroup}
                />
              </View>
              <View>
                <TextInput
                  ref="mobileNo"
                  keyboardType="numeric"
                  style={{ backgroundColor: "transparent", width: "100%" }}
                  placeholder="Enter mobile number"
                  onChangeText={mobileNo => this.setState({ mobileNo })}
                  value={this.state.mobileNo.toString()}
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
    borderRadius: 100
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
