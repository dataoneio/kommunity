import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import { Icon } from "react-native-elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";
import firebase from "../../../Firebase";
import renderIf from "../../components/ViewFeed/renderIf";
import SingleAddAdmin from "../../components/SingleAddAdminComponent/SingleAddAdmin";
import { ScrollView } from "react-native-gesture-handler";
export default class AddAdmin extends React.Component {
  ActivateAdmin() {
    this.setState({ AddAdmin: true });
  }
  HideAdmin() {
    this.setState({ AddAdmin: false });
    if(this.state.Aname =="" || this.state.Anumber =="")
    {
        this.setState({ AddAdmin: false });

    }
    else if (
      this.state.Aname.trim().length > 0 &&
      this.state.Anumber.trim().length == 10
    ) {
        var myref=""
      const { navigation } = this.props;
      var comname = navigation.getParam("Comname", "no val");
      //comname = "aaaaa";
       myref=firebase
        .database()
        .ref("app/" + comname + "/Admins")
        .push({
          Name: this.state.Aname,
          Number: "91" + this.state.Anumber
        });
        console.log("dddddddddd"+myref.key)
        //alert("qqq"+myref.key)
        firebase
      .database()
      .ref("app/"+comname+"/User/" + myref.key)
      .set({
        Name: this.state.Aname,
        Email: "",
        Profile_photo:
          "https://cdn-images-1.medium.com/max/1600/0*WK_vAxJo4O7Kdq3j.png",
        Profession: "",
        Gender: "",
        Blood_Group: "",
        Contact_Number:"91"+this.state.Anumber,
        Country: "",
        City: "",
        State: "",
        Address_line1: ""
      });
    firebase
      .database()
      .ref("app/"+comname+"/User/" + myref.key + "/Business_details")
      .update({
        Name: "",
        Contact_Number: "",
        Type: "",
        Category: "",
        Address_line1: "",
        Address_line2: ""
      });
    }
    else{
        alert("incorrect data")
    }
    this.setState({ AddAdmin: false });
    this.setState({ Aname: "", Anumber: "" });
  }
  constructor(props) {

    super(props);
    this.state = {
      BloodGroup: "",
      City: "",
      AddAdmin: false,
      AdminArray: [],
      Aname:"",
      Anumber:""
    };
  }
  rejectRequest(AdminId,key) {
    const { navigation } = this.props;
    var comname = navigation.getParam("Comname");
    //var comname = "aaaaa";
    firebase
      .database()
      .ref("app/" + comname + "/Admins/" + AdminId)
      .remove();
      firebase
      .database()
      .ref("app/" + comname + "/User/" + AdminId)
      .remove();
    this.state.AdminArray.splice(key, 1);
    this.setState({ AdminArray: this.state.AdminArray });
    //alert("keyyyy" + AdminId);
  }
  componentDidMount() {
    const { navigation } = this.props;
    var comname = navigation.getParam("Comname");
    var arr1 = [];
    //comname = "aaaaa";
    firebase
      .database()
      .ref("app/" + comname + "/Admins")
      .on("child_added", data => {
        console.log("aaaaaaaa");
        arr1.push({
          Name: data.val().Name,
          Number: data.val().Number,
          AdminId: data.key
        });
        this.setState({ AdminArray: arr1 });
      });
  }
  render() {
    const { navigation } = this.props;

    var comname = navigation.getParam("Comname","aaaaa");
    //comname="aaaaa"
    var adminarr = this.state.AdminArray.map((val, key) => {
      return (
        <View key={key}>
          <View style={{ padding: 2 }}>
            <SingleAddAdmin
              key={key}
              keyval={key}
              val={val}
              reject={() => this.rejectRequest(val.AdminId, key)}
            />
            {/* <Text>{val.Name}</Text>
          <Text>{val.Number}</Text> */}
          </View>
        </View>
      );
    });
    return (
      <View style={{paddingBottom:50}}>
        {/* <View style={styles.header}>
          <View>
            <TouchableOpacity
              title=""
              onPress={() => {
                  //alert("ccoommnnaamme"+comname)
                  firebase.database().ref("app/"+comname).remove(),
                this.props.navigation.goBack(null)
              }}
            >
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.home}>Add Admin to {comname}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View> */}
         <View style={styles.header}>
            <View>
              <TouchableOpacity
                title=""
                onPress={() => {
                    firebase.database().ref("app/"+comname).remove(),
                  this.props.navigation.goBack(null)
                }}
              >
                <Icon name="arrow-back" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.home}>Add Admins to {comname}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                title="Done"
                onPress={()=>
                   { 
                       console.log("qqqqq"+this.state.AdminArray)
                       if(this.state.AdminArray.length == 0 )
                    {
                        alert("Add atleast one admin")
                    }
                 else{ this.props.navigation.navigate("HomeNavigator")}
                }
            }
              >
                <Icon name="done" color="white" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        <ScrollView>
        <View>{adminarr}</View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "lucida grande"
            }}
          >
            Add Admins for Community
          </Text>
          <View style={{ paddingVertical: 5 }}>
            <TouchableOpacity
              style={{
                padding: 2,
                justifyContent: "flex-start",
                backgroundColor: "#dddce2",
                borderRadius: 5
              }}
              onPress={this.ActivateAdmin.bind(this)}
            >
              <Icon name="add" color="#C60C31" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {renderIf(this.state.AddAdmin)( 
            <View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text style={{ fontSize: 18, paddingTop: 2 }}>
                  Mobile Number :
                </Text>
                <View style={{ paddingLeft: 10 }}>
                  <TextInput
                    placeholder="Add 10 digit mobile number"
                    placeholderTextColor="#676261"
                    onChangeText={Anumber => this.setState({ Anumber })}
                    value={this.state.Anumber}
                    keyboardType="numeric"
                    style={{
                      padding: 5,
                      backgroundColor: "white",
                      color: "black",
                      fontSize: 18,
                      borderColor: "#908a89",
                      borderWidth: 0.5,
                      borderRadius: 5
                    }}
                    autoFocus={true}
                    onSubmitEditing={this.HideAdmin.bind(this)}

                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text style={{ fontSize: 18, paddingTop: 2 }}>Name :</Text>
                <View style={{ paddingLeft: 10 }}>
                  <TextInput
                    placeholder="Admin Name"
                    placeholderTextColor="#676261"
                    onChangeText={Aname => this.setState({ Aname })}
                    value={this.state.Aname}
                    style={{
                      padding: 5,
                      backgroundColor: "white",
                      color: "black",
                      fontSize: 18,
                      borderColor: "#908a89",
                      borderWidth: 0.5,
                      borderRadius: 5
                    }}
                    returnKeyType="done"
                    onSubmitEditing={this.HideAdmin.bind(this)}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
        </ScrollView>
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

  search: {
    fontFamily: "lucida grande"
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
    color: "black",
    paddingRight: 10,
    padding: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderLeftWidth: 2,
    borderLeftColor: "white"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
