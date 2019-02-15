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
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import firebase from "../Firebase";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import fs from "react-native-fs";
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const win = Dimensions.get("window");
export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      descInput: "",
      date: "",
      category: "",
      imageurl: ""
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

  addEvent() {
    console.log("added in database");
    console.log("category---" + this.state.category);
    if (this.state.title.trim().length == 0) {
      alert("title must not be empty");
    } else if (this.state.descInput.trim().length == 0) {
      alert("A short description is needed.");
    } else {
      var d1 = new Date();

      this.setState({
        date: d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear()
      });
      firebase
        .database()
        .ref("app/Event details")
        .push({
          Description: this.state.descInput.trim(),
          Title: this.state.title,
          Date:
            d1.getDate() + "/" + (d1.getMonth() + 1) + "/" + d1.getFullYear(),
          Post_View: "false",
          Category: this.state.category,
          Image: this.state.imageurl,
          Comment: ""
        });
      this.props.navigation.navigate("Home");
      this.setState({
        title: "",
        descInput: ""
      });
    }
  }
  goback(){
    const { navigate } = this.props.navigation;
 navigate("Home");
  }
  render() {
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
        value: "Bussiness"
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
                placeholder="Title"
                placeholderTextColor="#676261"
                onChangeText={title => this.setState({ title })}
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
            <View style={{ padding: 10 }}>
              <AutoGrowingTextInput
                style={{ borderColor: "#676261", borderWidth: 2 }}
                onChangeText={descInput => this.setState({ descInput })}
                placeholder={"Your Message"}
                value={this.state.descInput}
                placeholderTextColor="#676261"
              />
            </View>
            <View style={{justifyContent:'space-around'}}>
              <Image
                style={styles.ImageContainer}
                source={{ uri: this.state.imageurl }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", backgroundColor: "#243545" }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  ImageContainer: {
    position: "relative",
    top: 40,
    //left: 70,
    // borderRadius: 10,
    width: (win.width * 2) / 3,
    height: (win.height/2.5),
    // paddingTop: 10,
    padding: 0,

    borderColor: "transparent" /*  */,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    left: win.width / 6,
    paddingBottom: 100
    //color:"white"

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
