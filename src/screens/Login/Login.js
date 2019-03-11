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
  Dimensions,
  AsyncStorage,
  BackHandler
} from "react-native";
import { Icon } from "react-native-elements";
import keys from "../../../keys";
import firebase from "../../../Firebase";
import styles from "./LoginStyle";
const wid = Dimensions.get("window");

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

  handleBackPress = () => {
    console.log("removed")
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  }
  handleBackButton() {
    this.setState({ isLogin: true });
    this.setState({ isToken: false });
    return true;
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress");
  // }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

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
  setValueLocally = () => {
    AsyncStorage.setItem("token", this.state.phone);
    //alert("Value Stored Successfully.")
  };

  mobilevalidate(text) {
    const reg = /^[0]?[123456789]\d{11}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  searchPhoneNumber() {
    if (!this.mobilevalidate(this.state.phone)) {
      alert("invalid number");
    } else {
      console.log("eeee" + this.state.phone.length);
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
  }

  hasNumber(num) {
    var regex = /\d/g;
    console.log("ddddddd" + regex.test(num));
    return regex.test(num);
  }
  verifyToken() {
    BackHandler.removeEventListener("hardwareBackPress",this.handleBackPress);

    if (!(this.state.token.length == 4)) {
      alert("4 digit otp only");
    } else {
      this.setValueLocally();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      body = {
        api_key: keys.REACT_APP_OTP_API_KEY,
        api_secret: keys.REACT_APP_OTP_SECRET_KEY,
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
            this.setState({ isToken: false });

            this.setState({ isLogin: true });
          } else {
            ToastAndroid.show(responseJson.error_text, ToastAndroid.SHORT);
          }
        })
        .catch(error => {
          ToastAndroid.show("Gagal", ToastAndroid.SHORT);
        });
    }
  }
  if(booleanValue) {
    return "something";
  }
  loginProcess() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    body = {
      api_key: keys.REACT_APP_OTP_API_KEY,
      api_secret: keys.REACT_APP_OTP_SECRET_KEY,
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
      <View style={{ backgroundColor: "#E3E7E6", flex: 1 }}>
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
                    <Text style={styles.next}>NEXT</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxOne}>
            <Image
              source={require("../../assets/App_logo.png")}
              style={styles.logoStyle}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.boxTwo}>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  name="cellphone"
                  type="material-community"
                  size={35}
                  underlayColor="#FFFFFF"
                  style={{ alignSelf: "center", justifyContent: "ceter" }}
                />
              </View>
              <TextInput
                style={styles.mobileInput}
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
                    <Text style={styles.verifyButton}>VERIFY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxOne}>
            <Image
              source={require("../../assets/App_logo.png")}
              style={styles.logoStyle}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.boxTwo}>
              <View style={{ justifyContent: "center" }}>
                <Icon
                  name="cellphone"
                  type="material-community"
                  size={35}
                  underlayColor="#FFFFFF"
                  style={{ alignSelf: "center", justifyContent: "ceter" }}
                />
              </View>
              <TextInput
                style={styles.mobileInput}
                placeholder="Enter OTP"
                onChangeText={token => this.setState({ token })}
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}