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
import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-material-dropdown";
export default class MatrimonialForm extends React.Component {
    componentDidMount()
    {
        const { screenProps } = this.props;
        firebase.database().ref("app/"+screenProps.user.CommunityName+"/User/"+screenProps.user.id+"/Matrimonial").once("value",data=>{
            this.setState({Fname:data.toJSON().Fathers_Name})
            this.setState({Mname:data.toJSON().Mothers_Name})
            this.setState({date:data.toJSON().DOB})
            this.setState({Education:data.toJSON().Highest_Qualification})
            this.setState({MaritalStatus:data.toJSON().Marital_Status})
            console.log("eeee"+data.toJSON().Fathers_Name)
        })
        
    }
  SaveMatrimonialData() {
    const { screenProps } = this.props;
    console.log("ssssssssaaaaaaaaaasssss")
    console.log("sssssssssssss"+screenProps.user.id)

    firebase
      .database()
      .ref(
        "app/" +
          screenProps.user.CommunityName +
          "/User/" +
          screenProps.user.id +
          "/Matrimonial"
      )
      .set({
        DOB: this.state.date,
        Marital_Status: this.state.MaritalStatus,
        Mothers_Name: this.state.Mname,
        Fathers_Name: this.state.Fname,
        Highest_Qualification: this.state.Education
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      test: "",
      Subject: "",
      description: "",
      height: 40,
      date: "",
      Mname: "",
      Fname: "",
      Education: "",
      MaritalStatus: ""
    };
  }

  render() {
    let data1 = [
      {
        value: "Below Matriculation"
      },

      {
        value: "Matriculation"
      },
      {
        value: "Higher Secondary"
      },

      {
        value: "Graduate"
      },
      {
        value: "Post-Graduate"
      },
      {
        value: "Doctorate"
      }
    ];
    let data = [
      {
        value: "Single"
      },
      {
        value: "Married"
      },
      {
        value: "Divorced"
      },
      {
        value: "Widowed"
      }
    ];
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
            <Text style={styles.home}>Fill Details</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "lucida grande",
                fontWeight: "bold",
                fontSize: 16,
                color: "#C60C31",
                paddingTop: 10,
                justifyContent: "center",
                paddingLeft: 20
              }}
            >
              Date of Birth :
            </Text>
            <DatePicker
              style={{ width: 250, paddingLeft: 20 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                console.log("aaaaaaa----" + date),
                  this.setState({ date: date });
              }}
            />
          </View>
          {/* <View style={{ padding: 10 }}>
              <TextInput
                label="Education"
                placeholder="Education"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={title => this.setState({ title })}
                value={this.state.Education}
                style={{
                  backgroundColor: "transparent",
                  borderBottomColor: "#908a89",
                  borderBottomWidth: 0.5,
                  paddingTop:20,
                  paddingBottom:5,
                  fontSize:16
                }}
                placeholderTextColor="#908a89"
              />
            </View> */}
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <TextInput
              label="Father's Name"
              placeholder="Father's Name"
              maxLength={40}
              placeholderTextColor="#676261"
              onChangeText={Fname => this.setState({ Fname })}
              value={this.state.Fname}
              style={{
                backgroundColor: "transparent",
                borderBottomColor: "#908a89",
                borderBottomWidth: 0.5,
                paddingTop: 10,
                paddingBottom: 5,
                fontSize: 16
              }}
              placeholderTextColor="#908a89"
            />
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <TextInput
              label="Mother's Name"
              placeholder="Mother's Name"
              maxLength={40}
              placeholderTextColor="#676261"
              onChangeText={Mname => this.setState({ Mname })}
              value={this.state.Mname}
              style={{
                backgroundColor: "transparent",
                borderBottomColor: "#908a89",
                borderBottomWidth: 0.5,
                paddingTop: 10,
                paddingBottom: 5,
                fontSize: 16
              }}
              placeholderTextColor="#908a89"
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Dropdown
              label="Marital Status"
              labelColor="#676261"
              data={data}
              onChangeText={MaritalStatus => this.setState({ MaritalStatus })}
              value={this.state.MaritalStatus}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Dropdown
              label="Highest Qualification"
              labelColor="#676261"
              data={data1}
              onChangeText={Education => this.setState({ Education })}
              value={this.state.Education}
            />
          </View>
          <View
            style={{ paddingBottom: 100, alignSelf: "center", padding: 20 }}
          >
            <Button
              onPress={this.SaveMatrimonialData.bind(this)}
              title="Save"
              color="#C60C31"
              //style={styles.search}
            />
          </View>
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
