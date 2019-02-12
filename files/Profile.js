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
  Image
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../Firebase";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: "", region: "", txtvalue: "", imageurl: "" };
  }

  getDataFromFirebase() {
    let arr1 = [];
    var d = new Date();
    console.log("date===" + d);
    firebase
      .database()
      .ref("app/User")
      .on("child_added", data => {
        var result = [];
        var key1 = [];
        key1.push(data.key);
        let arr = data.toJSON();
        console.log("---" + JSON.stringify(arr));
        for (var i in arr) {
          result.push(arr[i]);
        }
        console.log("key--" + key1);
        console.log("---" + result.length);

        arr1.push({
          date: result[2].toString(),
          category: result[0].toString(),

          description: result[3].toString(),
          uid: data.key,
          title: result[6].toString(),
          url1: result[4].toString(),
          userId: result[7].toString()
        });

        console.log("date-" + result[2].toString());
        console.log("desc--" + result[3].toString());
        console.log("title-" + result[6].toString());
        console.log("url:" + result[4].toString());
        this.setState({ initialVals: arr1 });
        this.setState({ feeds: arr1 });
        this.setState({ isLoading: false });
        console.log("aaawwww" + JSON.stringify(arr1));
        console.log(
          "aaaooooooooooooooooooooooo" + JSON.stringify(this.state.initialVals)
        );
        console.log("aaa" + JSON.stringify(this.state.feeds));
      });
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

          this.setState({ uurl: url });
          console.log(" -------  " + this.state.uurl),
            console.log("uid1:---" + this.state.uid1);
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

  validate() {
    let text = this.state.txtvalue;
    console.log("olololololololo" + text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      alert("Email format is incorrect");
      //this.setState({email:text})
      return false;
    } else {
      this.setState({ email: text });
      // alert("Email format is correct")
      console.log("Email is Correct");
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
            <TouchableOpacity title="" onPress={this.validate.bind(this)}>
              <Icon name="done" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>
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
              <Text style={{ fontFamily: "lucida grande" }}> Edit Photo </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#676261"
              // onChangeText={title => this.setState({ Name })}
              //value={this.state.Name}
              style={{ backgroundColor: "transparent" }}
            />
            {/* <TextInput
            placeholder="Email"
            placeholderTextColor="#676261"
            // onChangeText={Email => this.setState({Email})}
            // value={this.state.Email}
            style={{ backgroundColor: "transparent" }}
          /> */}
            <TextInput
              placeholder="Email ID"
              onChangeText={txtvalue => this.setState({ txtvalue })}
              value={this.state.txtvalue}
              style={{ backgroundColor: "transparent" }}
            />
            <View style={{ padding: 10 }}>
              <Dropdown
                label="Gender"
                labelColor="#676261"
                data={data}
                onChangeText={Gender => this.setState({ Gender })}
                // value={"None"}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Dropdown
                label="Bloodgroup"
                labelColor="#676261"
                data={data1}
                onChangeText={Blood_Group => this.setState({ Blood_Group })}
                // value={"None"}
              />
            </View>

            <TextInput
              placeholder="Profession"
              placeholderTextColor="#676261"
              // onChangeText={title => this.setState({ Name })}
              //value={this.state.Name}
              style={{ backgroundColor: "transparent" }}
            />

            <TextInput
              ref="mobileNo"
              keyboardType="numeric"
              style={{ backgroundColor: "transparent", width: "100%" }}
              placeholder="Enter mobile number"
              // onChangeText={value => this.handleChange("mobileNo", num)}
            />
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
