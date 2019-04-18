import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
export default class SingleAddAdmin extends Component {
  render() {
    return (
      <View style={{ padding:10,backgroundColor: "#f2f2f2", flexDirection: "row",justifyContent:"space-between" }}>
        <Text style={{fontSize:16,fontWeight: "italics",fontFamily:"lucida grande"}}>
          {this.props.val.Name}
        </Text >
        <Text style={{fontSize:16,fontWeight:"bold",fontFamily:"lucida grande"}}>{this.props.val.Number}</Text>
        <View
          style={{
            left:0,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity title="reject" onPress={this.props.reject}>
            <Icon
              name="close"
              type="material-community"
              size={20}
              color="#cc0000"
              style={{ paddingTop: 7 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
