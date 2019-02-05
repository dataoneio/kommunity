import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import React, { Component } from "react";

import Home from "./files/Home";
import AddEvent from "./files/AddEvent";
import Profile from "./files/Profile";
import UserNotification from "./files/UserNotification";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        TabBarIcon: () =><Icon name="add" size={35} style={{color:'gray'}} />,
        // headerTitleStyle: {
        //     fontWeight: "bold",
        //     color: "#fff",
        //   },
           
        
      }
    },

    Profile: { screen: Profile },
    AddEvent: { screen: AddEvent },
    Notification: { screen: UserNotification }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
        labelStyle: {        
            fontSize: 16,        
            //lineHeight: 20,        
            //fontFamily: "CircularStd-Book"      
           } ,
      //tintColor: "black",
      showIcon: true
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;
