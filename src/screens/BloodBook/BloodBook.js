import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";

export default class BloodBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BloodGroup: "",
      City: ""
    };
  }

  render() {
    let data = [
      {
        value: "A+"
      },
      {
        value: "A-"
      },
      {
        value: "B+"
      },
      {
        value: "B-"
      },
      {
        value: "O+"
      },
      {
        value: "O-"
      },
      {
        value: "AB+"
      },
      {
        value: "AB-"
      }
    ];
    let data1 = [
      {
        value: "Ahmedabad"
      },
      {
        value: "surat"
      },
      {
        value: "Others"
      }
    ];
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.home}>Blood Book</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
          <TouchableOpacity
            title="request"
            onPress={() => {
              this.props.navigation.navigate("BloodBankUsers", {
                txt: this.state.BloodGroup,
                city: this.state.City
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.sendButton}>Search</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <Dropdown
            label="Blood Group"
            labelColor="#676261"
            data={data}
            onChangeText={BloodGroup => this.setState({ BloodGroup })}
            // value={"None"}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Dropdown
            label="City"
            labelColor="#676261"
            data={data1}
            onChangeText={City => this.setState({ City })}
            // value={"None"}
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
