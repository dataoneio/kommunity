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
import firebase from "../../../Firebase";
import MatrimonialComponent from "../../components/MatrimonialComponent/MatrimonialComponent";
import { ScrollView } from "react-native-gesture-handler";
export default class MatrimonialSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MinAge: "",
      MaxAge: "",
      Gender: "",
      State: "",
      City: "",
      Name: "",
      MatrimonialUserArray: [],
      MatrimonialMatches: []

    };
  }
  searchByInput() {
    searchresult = this.state.MatrimonialUserArray;
    var result = searchresult.filter(vals => {
      (s1 = vals.Gender.toUpperCase()),
        (s2 = vals.Name.toUpperCase()),
        (s3 = vals.age),
        (s4 = vals.State.toUpperCase()),
        (s5 = vals.City.toUpperCase());
      (f1 = this.state.Gender.toUpperCase()),
        (f2 = this.state.Name.toUpperCase()),
        (f3 = this.state.City.toUpperCase()),
        (f4 = this.state.State.toUpperCase()),
        (f5 = this.state.MinAge),
        (f6 = this.state.MaxAge);
      if (
        s1.includes(f1) &&
        s2.includes(f2) &&
        s4.includes(f4) &&
        s5.includes(f3)
      ) {
        if (s3 > f5 && s3 < f6) {
          console.log("yessssssssss");
          return true;
        }
      }
    });
    this.setState({ MatrimonialMatches: result }, () => {
      console.log("ddddddd--" + JSON.stringify(this.state.MatrimonialMatches));
    });
  }
  componentDidMount() {
    var date = new Date();
    console.log("aaaaaqqqqq---" + date.getFullYear());
    const { navigation } = this.props;
    var { screenProps } = this.props;
    this.setState(
      {
        Name: navigation.getParam("Name", "no name"),
        City: navigation.getParam("City", " no city"),
        State: navigation.getParam("State", "no state"),
        Gender: navigation.getParam("Gender", " no Gender"),
        MinAge: navigation.getParam("MinAge", "no Min Age"),
        MaxAge: navigation.getParam("MaxAge", " no Max age")
      },
      () => {
        // console.log(
        //   "---" +
        //     this.state.MinAge +
        //     "----" +
        //     this.state.MaxAge +
        //     "----" +
        //     this.state.Gender +
        //     "-----" +
        //     this.state.State +
        //     "----" +
        //     this.state.City +
        //     "----" +
        //     this.state.Name
        // );
      }
    );
    var arr1 = [];

    firebase
      .database()
      .ref("app/" + screenProps.user.CommunityName + "/User")
      .on("child_added", data => {
        // console.log("999999----"+date1)

        console.log("aaaaaa" + data.key);
        if (
          data.toJSON().Matrimonial != null &&
          data.toJSON().Matrimonial.Marital_Status != "Married"
        ) {
          var s1 = JSON.stringify(
            data.toJSON().Matrimonial.DOB.replace(/-/g, "/")
          );
          s2 = s1.toString();
          var d1 = new Date(s2).getFullYear();
          var date = new Date().getFullYear();
          (UserAge = date - d1),
            arr1.push({
              Blood_Group: data.toJSON().Blood_Group,
              City: data.toJSON().City,
              Contact_Number: data.toJSON().Contact_Number,
              Email: data.toJSON().Email,
              Gender: data.toJSON().Gender,
              Name: data.toJSON().Name,
              Profession: data.toJSON().Profession,
              Profile_photo: data.toJSON().Profile_photo,
              State: data.toJSON().State,
              DOB: data.toJSON().Matrimonial.DOB.replace("-", "/"),
              Fathers_Name: data.toJSON().Matrimonial.Fathers_Name,
              Mothers_Name: data.toJSON().Matrimonial.Mothers_Name,
              Marital_Status: data.toJSON().Matrimonial.Marital_Status,
              Highest_Qualification: data.toJSON().Matrimonial
                .Highest_Qualification,
              age: UserAge
            });
          this.setState({ MatrimonialUserArray: arr1 }, () => {
            console.log("aaa---" + JSON.stringify(arr1));
            this.searchByInput();
          });
          console.log(
            "qqqq--" +
              JSON.stringify(data.toJSON().Matrimonial.DOB.replace(/-/g, "/"))
          );
        }
      });
  }
  render() {
    let MatrimonialUsers = this.state.MatrimonialMatches.map((val, key) => {
      return (
        <View key={key} style={{ paddingHorizontal: 5, paddingVertical: 3 }}>
          <MatrimonialComponent val={val} key={key} keyval={key} />
        </View>
      );
    });
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
            <Text style={styles.home}>Search Results</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          />
        </View>
        <ScrollView>
        <View
          style={{
            backgroundColor: "#dddce2"
          }}
        >
                <Text>helloooooaaaaa</Text>
          {MatrimonialUsers}
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
