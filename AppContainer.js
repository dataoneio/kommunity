import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {Ionicon, Icon} from 'react-native-vector-icons/Ionicons';
import Home from "./files/Home";
import AddEvent from "./files/AddEvent";
import Profile from "./files/Profile";
import UserNotification from "./files/UserNotification";
    import React, { Component } from 'react';

const TabNavigator = createBottomTabNavigator(
    {
      Home: { screen: Home,
        navigationOptions: {
            abBarLabel: 'Test',
            TabBarIcon: () => { return <Icon name="person-pin-circle" size={25} color={"white"} />; }
        
        }},
      Profile: { screen: Profile },
      AddEvent: { screen: AddEvent },
      Notification: { screen: UserNotification },   


      
    },
    {
      initialRouteName: "Home",
      tabBarOptions: {
        showIcon: true,
        labelStyle: {
          fontSize: 18,
          backgroundColor:"yellow",
        
        },
        tabStyle: {
          width: 100,
          backgroundColor:"red"
        },
        style: {
          backgroundColor: 'blue',
        },
      }
    }
  );
  
  const AppContainer = createAppContainer(TabNavigator);
  export default AppContainer;
  
