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
<<<<<<< HEAD
  Image
} from "react-native";
=======
  Image,Dimensions
} from "react-native";
const win = Dimensions.get("window");
>>>>>>> 53b099b967bfb63d3cb8810c1de2ac7b057ef960
export default class MatrimonialComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
<<<<<<< HEAD
      <View key={this.props.key}>
=======
      <View key={this.props.keyval} style={{backgroundColor:"white",borderRadius:5}}>
      <TouchableOpacity onPress={this.props.ViewProfile}>
>>>>>>> 53b099b967bfb63d3cb8810c1de2ac7b057ef960
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.ImageContainer1}
            source={{
              uri: this.props.val.Profile_photo
            }}
<<<<<<< HEAD
          />
        </View>
        <Text>{this.props.val.Name}</Text>
        <Text>{this.props.val.DOB}</Text>
        <Text>{this.props.val.age}</Text>
        <Text>{this.props.val.Marital_Status}</Text>
        <Text>{this.props.val.Highest_Qualification}</Text>
        <Text>{this.props.val.State}</Text>
        <Text>{this.props.val.City}</Text>
=======
          /> 
        <View style={{ flexDirection:"column",justifyContent:"space-evenly" ,padding:10}}>
        <Text style={styles.Data}>Name: {this.props.val.Name}</Text>
        <Text style={styles.Data}>Age: {this.props.val.age}</Text>
        <Text style={styles.Data}>Height: {this.props.val.Height}</Text>
        <Text style={styles.Data}>Gender: {this.props.val.Gender}</Text>
        <Text style={styles.Data}>City: {this.props.val.City}</Text>
        <Text style={styles.Data}>Marital Status: {this.props.val.Marital_Status}</Text>
        <Text style={styles.Data}>Qualification: {this.props.val.Highest_Qualification}</Text>
        </View>
        </View>
        </TouchableOpacity>
>>>>>>> 53b099b967bfb63d3cb8810c1de2ac7b057ef960
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
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    width: 150,
    height: 150,
    backgroundColor: "#fff"
  },
=======
    width: win.width / 2 - 20,
    height: win.width / 2 - 20,
    backgroundColor: "#fff"
  },
  Data:{
    fontFamily: "lucida grande",
    fontSize:16,
    color:"black"

  },
>>>>>>> 53b099b967bfb63d3cb8810c1de2ac7b057ef960
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
