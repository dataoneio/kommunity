import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  BackHandler,
  NavigationActions
} from "react-native";
import firebase from "../../../Firebase";
//import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import styles from "./RequestStyle";
export default class Request extends React.Component {
  handleBackButton() {
    this.props.navigation.goBack();
  }
  componentWillMount() {
    const { navigation } = this.props;
    var ph_number = navigation.getParam("phone1", "no-number");
    this.setState({ phone: ph_number });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }
  //   componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress');
  // }
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      token: null,
      requestId: null,
      brand: "Your Verification",
      from: "OTP ME TEST",
      to: null,
      isToken: false,
      isLogin: true,
      name: "",
      email: ""
    };

    this.saveRequest = this.saveRequest.bind(this);
  }

  saveRequest() {
    if (this.state.name.trim() == "") {
      alert("Please enter your name");
    } else {
      firebase
        .database()
        .ref("app/Joining_Requests")
        .push({
          Contact_Number: this.state.phone,
          Name: this.state.name
        });
      this.setState({
        phone: "",
        name: ""
      });

      this.props.navigation.navigate("Login");
    }
  }

  render() {
    console.log("render");
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.home}>Request for Joining</Text>
          <View>
            <TouchableOpacity
              title="request"
              onPress={this.saveRequest.bind(this)}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.sendButton}>Send</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 50 }}>
          <Image
            source={require("../../assets/App_logo.png")}
            style={{
              height: 150,
              width: 150,
              alignSelf: "center"
            }}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Mobile No"
            placeholder="Enter Mobile No:"
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            editable={false}
            disabled={true}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Name"
            maxLength={20}
            placeholder="Name"
            autoCapitalize="words"
            onChangeText={name => this.setState({ name })}
            value={this.state.name.slice(0, 20)}
          />
        </View>
        {/* <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Email Id"
            placeholder="Email address"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View> */}
      </View>
    );
  }
}
