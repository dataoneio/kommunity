import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
const win = Dimensions.get("window");

export default class ViewFeed extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("id", "NO-ID");
    const title = navigation.getParam("Title", " Title-missing ");
    const description = navigation.getParam("description", "  ");
    const imageurl = navigation.getParam("url", "xyz  ");

    return (
      <View style={{flex:1,backgroundColor:"#1B2936"}}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              title=""
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon name="arrow-back" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={styles.home}>POST</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text />
          </View>
        </View>
        <Text
          style={{ padding: 10, fontSize: 24, fontFamily: "lucida grande",fontWeight:"bold", paddingBottom:20 ,color:"white"}}
        >
          {JSON.stringify(title).replace(/\"/g, "")}
        </Text>
        <Text
          style={{ padding: 10, fontSize: 18, fontFamily: "lucida grande" ,color:"#8b8b8b"}}
        >
          {JSON.stringify(description).replace(/\"/g, "")}
        </Text>
        {/* <Text> {JSON.stringify(imageurl).replace(/\"/g, "")}</Text> */}

        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: JSON.stringify(imageurl).replace(/\"/g, "") }}
            style={{
              width: win.width - 20,
              height: win.height / 3,
              paddingLeft: 20,
              paddingBottom: 10,
              paddingTop: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#243545",
    //alignItems: "center",
    //justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  home: {
    fontFamily: "lucida grande",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
