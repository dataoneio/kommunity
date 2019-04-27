import React, { Component } from "react";
// import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../../Firebase";
import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-material-dropdown";
import { ScrollView } from "react-native-gesture-handler";
const win = Dimensions.get("window");
export default class MatrimonialForm extends React.Component {
  componentDidMount() {
    var d = new Date();
    var d1 = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    console.log("aaaa" + d1);
    this.setState({ maxdate: d1 });
    const { screenProps } = this.props;
    // if(firebase.database().ref("app/"+screenProps.user.CommunityName+"/User"+screenProps.user.id).on("child_added",data=>{
    //   if(data.toJSON().Matrimonial == null)
    //   {

    //   }
    // }))
    firebase
      .database()
      .ref(
        "app/" + screenProps.user.CommunityName + "/User/" + screenProps.user.id
      )
      .once("value", data => {
        if (data.toJSON().Matrimonial != null) {
          this.setState({ Fname: data.toJSON().Matrimonial.Fathers_Name });
          this.setState({ Mname: data.toJSON().Matrimonial.Mothers_Name });
          this.setState({ date: data.toJSON().Matrimonial.DOB });
          this.setState({
            Education: data.toJSON().Matrimonial.Highest_Qualification
          });
          this.setState({
            MaritalStatus: data.toJSON().Matrimonial.Marital_Status
          });
          this.setState({height:data.toJSON().Matrimonial.Height})
          this.setState({weight:data.toJSON().Matrimonial.Weight})
          this.setState({time:data.toJSON().Matrimonial.Birth_time})
          this.setState({Salary:data.toJSON().Matrimonial.Salary})
          this.setState({Hobbies:data.toJSON().Matrimonial.Hobbies})
          this.setState({BirthPlace:data.toJSON().Matrimonial.Birth_Place})
          console.log("eeee" + data.toJSON().Matrimonial.Fathers_Name);
        }
      });
  }
  SaveMatrimonialData() {
    const { screenProps } = this.props;
    console.log("ssssssssaaaaaaaaaasssss");
    console.log("sssssssssssss" + screenProps.user.id);

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
        Highest_Qualification: this.state.Education,
        Birth_time: this.state.time,
        Height: this.state.height,
        Weight: this.state.weight,
        Hobbies: this.state.Hobbies,
        Salary:this.state.Salary,
        Birth_Place:this.state.BirthPlace
      });
    this.props.navigation.navigate("Matrimonial");
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
      MaritalStatus: "",
      maxdate: "",
      time: "",
      Salary: "",
      height: "",
      weight: "",
      Hobbies:"",
      BirthPlace:""
    };
  }

  render() {
    let data2 = [
      {
        value: "below 1 lac"
      },
      {
        value: "1 - 5 lacs"
      },
      {
        value: "6 - 10 lacs"
      },
      {
        value: "11 - 15 lacs"
      },
      {
        value: "above 16 lacs"
      }
    ];
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
            <Text style={styles.home}>Matrimonial Details</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "lucida grande",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#676261",
                  paddingTop: 10,
                  justifyContent: "center",
                  paddingLeft: 10
                }}
              >
                Date of Birth :
              </Text>
              <DatePicker
                style={{ width: 200, paddingLeft: 20 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                maxDate={this.state.maxdate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                  console.log("aaaaaaa----" + date),
                    this.setState({ date: date });
                }}
              />
            </View>

            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <Text
                style={{
                  fontFamily: "lucida grande",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#676261",
                  paddingTop: 10,
                  justifyContent: "center",
                  paddingLeft: 10
                }}
              >
                Time of Birth :
              </Text>
              <DatePicker
                style={{ width: 200, paddingLeft: 20 }}
                date={this.state.time}
                mode="time"
                placeholder="select time"
                format="h:mm:ss"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={time => {
                  console.log("aaaaaaa----" + time),
                    this.setState({ time: time });
                }}
              />
            </View>
            <View style={{ paddingRight: 10 }}>
              <TextInput
                label="Birth Place"
                placeholder="Birth Place"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={BirthPlace => this.setState({BirthPlace})}
                value={this.state.BirthPlace}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingTop: 15
              }}
            >
              <TextInput
                style={{
                  borderColor: "#908a89",
                  borderWidth: 0.5,
                  fontSize: 12,
                  width: win.width / 2 - 20,
                  backgroundColor: "white"
                }}
                keyboardType="numeric"
                maxLength={200}
                placeholder="Height"
                // placeholder={"Your problem description"}
                placeholderTextColor="#908a89"
                onChangeText={height => this.setState({ height })}
                editable={true}
                // value={this.state.descInput.slice(0, 200)}
                value={this.state.height}
              />
              <TextInput
                style={{
                  borderColor: "#908a89",
                  borderWidth: 0.5,
                  fontSize: 12,
                  width: win.width / 2 - 20,
                  backgroundColor: "white"
                }}
                keyboardType="numeric"
                maxLength={200}
                placeholder="weight"
                // placeholder={"Your problem description"}
                placeholderTextColor="#908a89"
                onChangeText={weight => this.setState({ weight })}
                editable={true}
                // value={this.state.descInput.slice(0, 200)}
                 value={this.state.weight}
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
            <View style={{ paddingRight: 10 }}>
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
            <View style={{ paddingRight: 10 }}>
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
            <View style={{ paddingRight: 10 }}>
              <TextInput
                label="Hobbies"
                placeholder="Hobbies"
                maxLength={40}
                placeholderTextColor="#676261"
                onChangeText={Hobbies => this.setState({ Hobbies })}
                value={this.state.Hobbies}
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
            <View style={{ paddingLeft: 10 }}>
              <Dropdown
                label="Salary"
                labelColor="#676261"
                data={data2}
                onChangeText={Salary => this.setState({ Salary })}
                value={this.state.Salary}
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
          </ScrollView>
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
