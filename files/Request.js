import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import firebase from "../Firebase";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";

export default class Request extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;
    var ph_number = navigation.getParam("phone1", "no-number");
    this.setState({ phone: ph_number });
  }

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
    firebase
      .database()
      .ref("app/Joining_Requests")
      .push({
        Contact_Number: this.state.phone,
        Name: this.state.name,
        email: this.state.email
      });
    this.setState({
      phone: "",
      name: "",
      email: ""
    });

    this.props.navigation.navigate("Login");
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
                  <Text
                    style={{
                      color: "white",
                      paddingRight: 10,
                      padding: 4,
                      paddingLeft:15,
                      fontSize: 20,
                      borderLeftWidth: 2,
                      borderLeftColor: "white"
                    }}
                  >
                    Send
                  </Text>
                </View>
                {/* <View>
                  <Icon name="done" color="white" size={25} />
                </View> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 50 }}>
          <Image
            source={require("../snap.png")}
            style={{
              height:150,
              width:150,
              alignSelf: "center"
            }}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Mobile No"
            placeholder="Enter Mobile No:"
            //autoCapitalize="sentences"

            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            editable={false}
            disable={true}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Name"
            placeholder="Name"
            autoCapitalize="words"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ backgroundColor: "transparent" }}
            label="Email Id"
            placeholder="Email address"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: 22,
    color: "white"
  }
});
