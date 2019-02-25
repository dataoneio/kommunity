import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
const wid = Dimensions.get("window");

import firebase from "../Firebase";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      token: null,
      requestId: null,
      brand: "Your Verification",
      from: "OTP ME TEST",
      to: null,
      isToken: false,
      isLogin: true
    };
    this.loginProcess = this.loginProcess.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.searchPhoneNumber = this.searchPhoneNumber.bind(this);
  }
  componentDidMount() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        {
          title: "Izinkan Aplikasi Mengirim Pesan",
          message: "Izinkan Aplikasi Mengirim Pesan"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("You can use the message");
      } else {
        console.warn("Message permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  searchPhoneNumber() {
    var ref = firebase.database().ref("app/User");
    ref
      .orderByChild("Contact_Number")
      .equalTo(this.state.phone)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          this.loginProcess();
          console.log("exists!");
        } else {
          var ref2 = firebase.database().ref("app/Joining_Requests");
          ref2
            .orderByChild("Contact_Number")
            .equalTo(this.state.phone)
            .once("value", snapshot2 => {
              if (snapshot2.exists()) {
                console.log("exists in requests database.");
                alert(
                  "Your Request is pending. Please wait for Admin to approve your request. Thank you!!"
                );
              } else {
                this.props.navigation.navigate("Request", {
                  phone1: this.state.phone
                });
                console.log("doesn't exists!!");
              }
            });
        }
      });
  }
  verifyToken() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    body = {
      api_key: "cc887b3e",
      api_secret: "l9QI2LwwOWufmE6U",
      request_id: this.state.requestId,
      code: this.state.token
    };
    fetch("https://api.nexmo.com/verify/check/json", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 0) {
          this.props.navigation.navigate("Home", {
            LoggedInNumber: this.state.phone
          });
        } else {
          ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show("Gagal", ToastAndroid.SHORT);
      });
  }
  if(booleanValue) {
    return "something";
  }
  loginProcess() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    body = {
      api_key: "cc887b3e",
      api_secret: "l9QI2LwwOWufmE6U",
      number: this.state.phone,
      brand: this.state.brand
    };
    fetch("https://api.nexmo.com/verify/json", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 0) {
          this.setState({
            requestId: responseJson.request_id,
            isToken: true,
            isLogin: false
          });
        } else {
          ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show("Login Gagal", ToastAndroid.SHORT);
      });
  }
  render() {
    return (
      <View style={{backgroundColor:"#E3E7E6" ,flex:1}}>
        <View style={[!this.state.isLogin && { display: "none" }]}>
          <View style={styles.header}>
            <Text style={styles.home}>Kommunity</Text>
            <View>
              <TouchableOpacity
                title="NEXT"
                onPress={this.searchPhoneNumber.bind(this)}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        paddingRight: 10,
                        padding: 4,
                        paddingLeft: 15,
                        fontSize: 20,
                        borderLeftWidth: 2,
                        borderLeftColor: "white"
                      }}
                    >
                      NEXT
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxOne}>
            <Image
              source={require("../snap.png")}
              style={{
                position:"relative",
                height: 150,
                width: 150,
                top:60,
                alignSelf:"center"
              }}
            />
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={styles.boxTwo}>
          <View style={{justifyContent:"center"}}>
            <Icon
              name="cellphone"
              type="material-community"
              size={35}
              // color = "#1B2936"
              underlayColor="#FFFFFF"
              style={{alignSelf:"center",justifyContent:"ceter"}}
            />
            </View>
            <TextInput
              style={{
                flex: 1,
                paddingLeft: 10,
                fontSize: 16,
                height: 50,
                width:wid.width*.95,
                //alignSelf: "flex-start",
                backgroundColor: "#FFFFFF",
               // borderColor:"red",borderWidth:2
              }}
              placeholder="Enter phone number with 91 as prefix :"
              onChangeText={phone => this.setState({ phone })}
              dataDetectorTypes="phoneNumber"
              keyboardType="numeric"
            />
          </View>
          </View>
        </View>
        <View style={[!this.state.isToken && { display: "none" }]}>
         <View style={styles.header}>
            <Text style={styles.home}>Verify OTP</Text>
            <View>
              <TouchableOpacity
                title="NEXT"
                onPress={this.verifyToken.bind(this)}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        paddingRight: 10,
                        padding: 4,
                        paddingLeft: 15,
                        fontSize:18,
                        borderLeftWidth: 2,
                        borderLeftColor: "white"
                      }}
                    >
                      VERIFY
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxOne}>
            <Image
              source={require("../snap.png")}
              style={{
                position:"relative",
                height: 150,
                width: 150,
                top:60,
                alignSelf:"center"
              }}
            />
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={styles.boxTwo}>
          <View style={{justifyContent:"center"}}>
            <Icon
              name="cellphone"
              type="material-community"
              size={35}
              // color = "#1B2936"
              underlayColor="#FFFFFF"
              style={{alignSelf:"center",justifyContent:"ceter"}}
            />
            </View>
            <TextInput
              style={{
                flex: 1,
                paddingLeft: 10,
                fontSize: 16,
                height: 50,
                width:wid.width*.95,
                //alignSelf: "flex-start",
                backgroundColor: "#FFFFFF",
               // borderColor:"red",borderWidth:2
              }}
              placeholder="Enter OTP"
              onChangeText={token => this.setState({ token })}
              dataDetectorTypes="phoneNumber"
              keyboardType="numeric"
            />
          </View>
          </View>

          {/* <TextInput
            title="Token"
            placeholder="Please Input Your Token"
            onChangeText={token => this.setState({ token })}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={{
              borderRadius: 2,
              backgroundColor: "#27ae60",
              alignItems: "center",
              justifyContent: "center",
              padding: 10
            }}
            onPress={() => this.verifyToken()}
          >
            <Text
              style={{
                fontFamily: "MyriadPro",
                color: "#fff",
                fontWeight: "bold",
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 16
              }}
            >
              Verify Token
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E7E6",
    padding: 10
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
  boxOne: {
  
    justifyContent: "center",
    paddingTop:10
  },
  boxTwo: {
   // borderColor:"#676261",
   // borderRadius:5,
    //borderWidth:1,
    position:"relative",
    top:90,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding:5,
    width: wid.width * 0.95
  },
  boxThree: {
    flex: 5,
    backgroundColor: "#E3E7E6"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
