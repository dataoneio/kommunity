import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import firebase from "../Firebase";

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
      console.log("render")
    return (
      <View style={styles.container}>
        <Text>
          Phone number not found in database. Please, fill the information below
          to request access.
        </Text>
        <Text />
        <Text />

        <Text>Mobile No:</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Enter Mobile No:"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={phone => this.setState({ phone })}
          value={this.state.phone}
          editable={false}
          disable={true}
        />

        <Text>Name:</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Enter full name:"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

        <Text>Email:</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Enter Email address:"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <Text />
        <Button title="Request" onPress={this.saveRequest.bind(this)} />
        <Text />
        <Button
          title="Already have an account?"
          onPress={() => this.props.navigation.navigate("Login")}
        />
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
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});