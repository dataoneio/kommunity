import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import firebase from "../../../Firebase";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import ImagePicker from "react-native-image-picker";
import { TextInput } from "react-native-paper";
const win = Dimensions.get("window");
import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs";
import renderIf from "../../components/ViewFeed/renderIf";
import { ScrollView } from "react-native-gesture-handler";

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class AddCommunity extends React.Component {
  AddCommunityToDatabase() {
    if (this.state.Comname != "" && this.state.imageurl != "") {
      arr1 = [];
      firebase
        .database()
        .ref("app")
        .on("child_added", data => {
          arr1.push(data.key);
        });
      firebase
        .database()
        .ref("app/" + this.state.Comname)
        .set({ Logo: this.state.imageurl });
      this.props.navigation.navigate("AddAdmin", {
        Comname: this.state.Comname
      });
      //this.setState({Comname:"",imageurl:""})
    } else {
      alert("incomplete data");
    }
  }
  ActivateAdmin() {
    this.setState({ AddAdmin: true });
  }
  HideAdmin() {
    this.setState({ AddAdmin: false });
  }
  constructor(props) {
    super(props);
    this.state = {
      BloodGroup: "",
      City: "",
      Comname: "",
      imageurl: "",
      AddAdmin: false
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
      console.log("eeeeeeeeeeeeeeee");
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

  render() {
    return (
      <View>
        <ScrollView>
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
            <Text style={styles.home}>Add Community</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                title=""
                onPress={this.AddCommunityToDatabase.bind(this)}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={styles.next}>NEXT</Text>
                  </View>
                </View>
                {/* <Icon name="done" color="white" size={30} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ paddingBottom: 100 }}>
              <TextInput
                label="Community Name"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={Comname => this.setState({ Comname })}
                value={this.state.Comname.slice(0, 40)}
                value={this.state.Comname}
                style={{
                  backgroundColor: "transparent",
                  borderBottomColor: "#908a89",
                  borderBottomWidth: 0.5,
                  paddingBottom: 5,
                  fontSize: 16,
                  marginBottom: 20
                }}
                placeholderTextColor="#908a89"
              />
              <View
                style={{
                  alignSelf: "center",
                  padding: 20,
                  justifyContent: "center",
                  marginBottom: 30,
                  width: 160,
                  height: 160,
                  padding: 0,
                  borderStyle: "dashed",
                  borderRadius: 5,
                  borderColor: "#676261",
                  borderWidth: 2
                }}
              >
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View>
                    {this.state.imageurl === "" ? (
                      <Text style={{ textAlign: "center" }}>Select Logo</Text>
                    ) : (
                      <Image
                        style={{
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 150,
                          height: 150,
                          padding: 0
                        }}
                        indicator={Progress.Circle}
                        source={{ uri: this.state.imageurl }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              {/* <View style={{paddingBottom:50,flexDirection:"row"}}>
            <Text>Add Admins</Text>
            <TouchableOpacity
              style={{ justifyContent: "flex-start" }}
              onPress={this.ActivateAdmin.bind(this)}
            >
              <Icon name="add" color="red" size={30} />
            </TouchableOpacity>
            </View>
            {renderIf(this.state.AddAdmin)(
              <View style={styles.footer}>
                <TextInput
                  placeholder="Add 10 digit mobile number"
                  placeholderTextColor="white"
                  onChangeText={Anumber => this.setState({ Anumber })}
                  value={this.state.Anumber}
                  keyboardType="numeric"
                  style={{
                    padding: 1,
                    backgroundColor: "#908a89",
                    color: "white",
                    fontSize:6,
                    borderBottomColor: "#908a89",
                    borderBottomWidth: 0.5
                  }}
                />
                <TextInput
                  placeholder="Admin Name ..."
                  placeholderTextColor="white"
                  onChangeText={Aname => this.setState({ Aname })}
                  value={this.state.Aname}
                  style={{
                    padding: 1,
                    backgroundColor: "#908a89",
                    color: "white",
                    fontSize: 6,
                    borderBottomColor: "#908a89",
                    borderBottomWidth: 0.5
                  }}
                  returnKeyType="done"
                  autoFocus={true}
                  onSubmitEditing={this.HideAdmin.bind(this)}
                />
              </View>
            )} */}
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

  search: {
    fontFamily: "lucida grande"
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
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  next:{
    color: "white",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 18,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  },
});
