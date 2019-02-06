import React, { Component } from "react";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Dropdown } from "react-native-material-dropdown";
import {
 Platform,
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import firebase from "../Firebase";

export default class AddEvent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     title: "",
     descInput: "",
     date:"",
     category:"",
   };
 }



 addEvent(){
   console.log("added in database");
   console.log("category---"+this.state.category);
   if(this.state.title.trim().length==0)
   {
     alert("title must not be empty");
   }
   else if(this.state.descInput.trim().length==0)
   {
     alert("A short description is needed.");
   }
   else{var d1=new Date();

   this.setState({
    date:  d1.getDate() +"/"+(d1.getMonth()+1) + "/" +d1.getFullYear()
  });
   firebase.database().ref("app/Event details").push({
     Description:this.state.descInput,
     Title:this.state.title,
     Date:d1.getDate() +"/"+(d1.getMonth()+1) + "/" +d1.getFullYear(),
     Post_View:"false",
     Category:this.state.category,
     Image:"",
     Comment:""
   })
  }

  this.setState({
    title:"",
    descInput:"",
    category:"",
    
  })
 }
 render() {
   let data = [
     {
       value: "Birthday/Anniversary"
     },
     {
       value: "Announcement"
     },
     {
       value: "Meet-up"
     },
     {
      value: "Party"
    },
    {
      value: "Education"
    },
    {
      value: "Bussiness"
    }
   ];
   return (
     <ScrollView>
     <View>
       <View style={styles.header}>
         <Text style={styles.home}>Add Post</Text>
         <View
           style={{ flexDirection: "row", justifyContent: "space-between" }}
         >
           <TouchableOpacity title="" onPress={this.addEvent.bind(this)}>
             <Icon name="done" color="black" size={30} />
           </TouchableOpacity>
         </View>
       </View>
       <View style={{ padding: 10 }}>
         <TextInput
           placeholder="Title"
           placeholderTextColor="#676261"
           onChangeText={title => this.setState({ title })}
           value={this.state.title}
           style={{ backgroundColor: "transparent" }}
         />
       </View>
       <View style={{ padding: 10 }}>
         <Dropdown label="Category" labelColor="#676261" data={data} onChangeText={category=>this.setState({category})} />
       </View>
       <View style={{padding:10}}>
       <AutoGrowingTextInput
         style={{borderColor:"#676261",borderWidth:2 }}
         onChangeText={descInput => this.setState({ descInput })}
         placeholder={"Your Message"}
         placeholderTextColor="#676261"
       />
       </View>
     </View>
     </ScrollView>
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
 header: {
   backgroundColor: "#ffcc00",
   //alignItems: "center",
   //justifyContent: "center",
   borderBottomWidth: 2,
   borderBottomColor: "white",
   padding: 10,
   flexDirection: "row",
   justifyContent: "space-between"
 },
 home: {
   justifyContent: "center",
   fontWeight: "bold",
   fontSize: 18
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