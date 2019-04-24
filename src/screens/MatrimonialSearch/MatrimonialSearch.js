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
import { ScrollView } from "react-native-gesture-handler";

export default class MatrimonialSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  updateSize = height => {
    this.setState({
      height
    });
  };

  render() {
    const { height } = this.state;
    
    return <View>
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
            <Text style={styles.home}>Select Criteria</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <ScrollView>
        <TextInput
                label="Name"
                style={{
                  padding: 5,
                  width: this.state.testWidth,
                  borderBottomColor: "#908a89",
                  borderBottomWidth: 0.5,
                  fontSize: 16
                }}
                maxLength={200}
                placeholder="Name"
                // placeholder={"Your problem description"}
                placeholderTextColor="#908a89"
                onChangeText={Name => this.setState({Name })}
                editable={true}
                // value={this.state.descInput.slice(0, 200)}
                value={this.state.Name}
              />
        </ScrollView>
    </View>;
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
