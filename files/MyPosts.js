import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class MyPosts extends React.Component {
  render() {
    return (
      // <View>
      //   <View style={styles.header}>
      //     <View>
      //       <TouchableOpacity title="" onPress={this.goback.bind(this)}>
      //         <Icon name="arrow-back" color="white" size={30} />
      //       </TouchableOpacity>
      //     </View>
      //     <Text style={styles.home}>Info</Text>
      //     <View
      //       style={{
      //         flexDirection: "row",
      //         justifyContent: "space-between"
      //       }}
      //     >
      //       {/* <TouchableOpacity title="" onPress={this.updateData.bind(this)}>
      //       <Icon name="done" color="white" size={30} />
      //     </TouchableOpacity> */}
      //     </View>
      //   </View>
      //   <View style={{ alignSelf: "center", paddingTop: 20 }}>
      //     <View style={{ justifyContent: "center" }}>
      //       <Image
      //         borderRadius={50}
      //         style={styles.ImageContainer1}
      //         source={{
      //           uri: this.state.imageurl
      //         }}
      //         indicator={Progress.Circle}
      //       />

      //       {/* <TouchableOpacity
      //    style={{ alignSelf: "center" }}
      //    onPress={this.selectPhotoTapped.bind(this)}
      //  >
      //    <Text style={{ fontFamily: "lucida grande" }}>
      //      {" "}
      //      Edit Photo{" "}
      //    </Text>
      //  </TouchableOpacity> */}
      //     </View>
      //   </View>
      // </View>
      <View>
        <Text>hello ffff</Text>
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
