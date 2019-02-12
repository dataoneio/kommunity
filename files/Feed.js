import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  //Button,
  Dimensions
} from "react-native";
//import { Icon } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const win = Dimensions.get("window");
export default class Note extends Component {
  render() {
    if (this.props.val.url1 == "") {
      return (
        <View key={this.props.keyval} style={styles.note}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Image
                style={styles.ImageContainer1}
                source={{ uri:"https://cdn-images-1.medium.com/max/1600/0*WK_vAxJo4O7Kdq3j.png"}}
              />
              <TouchableOpacity style={{ paddingLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      color: "#ededed",
                      fontWeight: "bold"
                    }}
                  >
                    {this.props.val.userId}
                  </Text>
                  <View>
                    <Text style={styles.noteText}>{this.props.val.date}</Text>
                  </View>
                </View>
                <Text style={styles.noteText1}>{this.props.val.title}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
           onPress={this.props.deleteMethod}
           style={styles.noteDeletee}
         >
           <Icon name="delete" color="#a36955" />
         </TouchableOpacity> */}
            </View>
            <TouchableOpacity>
              <Text style={styles.noteText2} multiline={false}>
                {this.props.val.description}
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              {/* <TouchableOpacity
       onPress={this.props.deleteMethod}
       style={styles.noteDeletee}
     >
       <Icon name="delete" color="#a36955" />
     </TouchableOpacity> */}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View key={this.props.keyval} style={styles.note}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Image
                style={styles.ImageContainer1}
                source={{ uri: this.props.val.url1 }}
              />
              <TouchableOpacity style={{ paddingLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      color: "#ededed",
                      fontWeight: "bold"
                    }}
                  >
                    {this.props.val.userId}
                  </Text>
                  <View>
                    <Text style={styles.noteText}>{this.props.val.date}</Text>
                  </View>
                </View>
                <Text style={styles.noteText1}>{this.props.val.title}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
           onPress={this.props.deleteMethod}
           style={styles.noteDeletee}
         >
           <Icon name="delete" color="#a36955" />
         </TouchableOpacity> */}
            </View>
            <TouchableOpacity>
              <Text style={styles.noteText2} multiline={false}>
                {this.props.val.description}
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: this.props.val.url1 }}
                style={{
                  width: widthPercentageToDP("90%"),
                  height: 250,
                  paddingLeft: 20,
                  paddingBottom: 10,
                  paddingTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {/* <TouchableOpacity
           onPress={this.props.editMethod}
           style={styles.noteDeletee1}
         >
           <Icon name="edit" />
         </TouchableOpacity> */}
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  note: {
    position: "relative",
    padding: 0,
    paddingBottom: 10,
    backgroundColor: "#1B2936"
    //borderBottomWidth: 2,
    //borderBottomColor: "#ededed"
  },
  ImageContainer1: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50
  },

  noteText1: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //fontWeight: "bold",
    fontSize: 14,
    color: "white"

    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText2: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //fontWeight:"bold",
    fontSize: 14,
    color: "#8b8b8b"

    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  },
  noteText: {
    paddingLeft: 170,
    paddingRight: 30,
    color: "#8b8b8b"
    //borderLeftWidth: 5,
    //borderLeftColor: "black"
  }
});