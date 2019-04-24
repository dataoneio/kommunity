import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import email from "react-native-email";

export default class Matrimonial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      height: 40
    };
  }

  render() {
    const { height } = this.state;

    return (
      <View>
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
          <View>
            <Text style={styles.home}>Matrimonial</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <View style={{paddingVertical:40,paddingHorizontal:20}}>
        <TouchableOpacity style={{padding:4,borderRadius:5,borderWidth:0.5,}} on onPress={()=>{this.props.navigation.navigate("MatrimonialForm")}}>
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <Icon name="add" color="#c60c31" size={30} />
            <Text style={styles.home1}>Update Matrimonial Details</Text>
            </View>
        </TouchableOpacity>
        </View>
        <View
            style={{ paddingBottom: 100,alignSelf:"center", padding: 20 }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("BloodBankUsers", {
                  txt: this.state.BloodGroup,
                  city: this.state.City
                });
              }}
              title="Skip"
              color="#C60C31"
              style={styles.search}
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
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "white"
  },
  home1: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "#C60C31"
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
    color: "white",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  }
});
