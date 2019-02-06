import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "./files/Home";
import AddEvent from "./files/AddEvent";
import Profile from "./files/Profile";
import UserNotification from "./files/UserNotification";
import Search from "./files/Search";
import React, { Component } from "react";

const TabNavigator = createBottomTabNavigator(
 {
   Home: {
     screen: Home,
     navigationOptions: {
       tabBarIcon: () => (
         <Icon name="home" size={30} style={{ color: "gray" }} />
       ),
       showIcon: true
       
     }
   },
   Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon name="search" size={30} style={{ color: "gray" }} />
      ),
      showIcon: true,
      tabBarVisible:false
      
    }
  },
   
   
   AddEvent: { screen: AddEvent,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon name="add-box" size={30} style={{ color: "gray" }} />
      ),
      showIcon: true,
      tabBarVisible: false
      
    }
  },
  Notification: { screen: UserNotification,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon name="notifications" size={30} style={{ color: "gray" }} />
      ),
      showIcon: true
      
    } },
  Profile: { screen: Profile,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon name="info" size={30} style={{ color: "gray" }} />
      ),
      showIcon: true
      
    } },
 },
 {
   initialRouteName: "Home",
   tabBarOptions: {
     labelStyle: {
       fontSize: 14
       //lineHeight: 20,
       //fontFamily: "CircularStd-Book"
     },
     //tintColor: "black",
     
   }
 }
);

const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;