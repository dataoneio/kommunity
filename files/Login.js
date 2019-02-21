import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid
} from "react-native";
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
      api_key: "c5a7a96a",
      api_secret: "fydSG6nTzmVCcxyB",
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
          this.props.navigation.navigate("Home");
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
      api_key: "c5a7a96a",
      api_secret: "fydSG6nTzmVCcxyB",
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
      <View style={styles.container}>
        <View style={[!this.state.isLogin && { display: "none" }]}>
          <TextInput
            title="Phone"
            placeholder="Please Input Your Phone note : prefix number must be 91"
            onChangeText={phone => this.setState({ phone })}
            dataDetectorTypes="phoneNumber"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={{
              borderRadius: 2,
              backgroundColor: "#007BB7",
              alignItems: "center",
              justifyContent: "center",
              padding: 10
            }}
            onPress={() => this.searchPhoneNumber()}
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[!this.state.isToken && { display: "none" }]}>
          <TextInput
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
    backgroundColor: "#F5FCFF",
    padding: 10
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
