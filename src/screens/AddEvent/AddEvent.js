import React, { Component } from "react";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Dropdown } from "react-native-material-dropdown";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
import styles from "./AddEventStyle";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const win = Dimensions.get("window");
export default class AddEvent extends React.Component {
  componentDidMount() {
    const { screenProps } = this.props;
    console.log("gegegegeg" + screenProps.user.number);
    console.log("gegegegeg" + screenProps.user.id);

    firebase
      .database()
      .ref("app/User")
      .orderByChild("Contact_Number")
      .equalTo(screenProps.user.number)
      .on("child_added", data => {
        val1 = JSON.stringify(data.val());
        if (data.exists()) {
          console.log("dddddddddddd----" + JSON.stringify(data.key));
          this.setState({ UserId: data.key });
        }
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      descInput: "",
      date: "",
      category: "",
      imageurl: "",
      testing: "",
      UserId: ""
    };
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
          this.setState({ uurl: url });
          console.log(" -------  " + this.state.uurl),
            console.log("uid1:---" + this.state.uid1);
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

  addEvent() {
    console.log("added in database");
    console.log("category---" + this.state.category);
    if (this.state.title.trim().length == 0) {
      alert("Title must not be empty");
    } else if (this.state.descInput.trim().length == 0) {
      alert("A short description is needed.");
    } else {
      var d1 = new Date();

      console.log(d1 + "dATEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      this.setState({
        date: d1.toString()
      });
      console.log(this.state.date + "Datee");
      firebase
        .database()
        .ref("app/Event details")
        .push({
          Description: this.state.descInput.trim(),
          Title: this.state.title,

          Date: Date.now(),
          Post_View: "false",
          Category: this.state.category,
          Image: this.state.imageurl,
          Comments: "",
          UserId: this.state.UserId
        });
      this.props.navigation.navigate("Home");
      this.setState({
        title: "",
        descInput: "",
        imageurl:""
      });
    }
  }
  goback() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  render() {
    var { screenProps } = this.props;
    let data = [
      {
        value: "None  "
      },
      {
        value: "Birthday/Anniversary"
      },
      {
        value: "Announcement"
      },
      {
        value: "Meet-up"
      },
      {
        value: "Party"
      },
      {
        value: "Education"
      },
      {
        value: "Business"
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <View style={styles.header}>
              <View>
                <TouchableOpacity title="" onPress={this.goback.bind(this)}>
                  <Icon name="arrow-back" color="white" size={30} />
                </TouchableOpacity>
              </View>
              <Text style={styles.home}>Add Post</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity title="" onPress={this.addEvent.bind(this)}>
                  <Icon name="done" color="white" size={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                label="Title"
                placeholder="Title"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={title => this.setState({ title })}
                value={this.state.title.slice(0, 40)}
                value={this.state.title}
                style={{ backgroundColor: "transparent" }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Dropdown
                label="Category"
                labelColor="#676261"
                data={data}
                onChangeText={category => this.setState({ category })}
                // value={"None"}
              />
            </View>
            <View style={{ padding: 10, paddingTop: 20 }}>
              <AutoGrowingTextInput
                label="Description"
                style={{
                  borderBottomColor: "#908a89",
                  borderBottomWidth: 0.5,
                  fontSize: 16
                }}
                onChangeText={descInput => this.setState({ descInput })}
                maxLength={200}
                value={this.state.descInput.slice(0, 200)}
                placeholder={"Your Message"}
                value={this.state.descInput}
                placeholderTextColor="#908a89"
              />
            </View>
            <View style={{ justifyContent: "space-around" }}>
              <Image
                style={styles.ImageContainer}
                source={{ uri: this.state.imageurl }}
                indicator={Progress.Circle}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", backgroundColor: "#2f497e" }}>
          <TouchableOpacity
            title="image"
            style={{ padding: 10 }}
            onPress={this.selectPhotoTapped.bind(this)}
          >
            <Icon name="image" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}