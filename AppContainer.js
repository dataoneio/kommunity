import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import MyPosts from "./files/MyPosts";
import Home from "./files/Home";
import AddEvent from "./files/AddEvent";
import Profile from "./files/Profile";
import UserNotification from "./files/UserNotification";
import Search from "./files/Search";
import React, { Component } from "react";
import Info from "./files/Info";

const StackNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },

    MyPosts: {
      screen: MyPosts
    },
    
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (tintColor, focused, active) => (
          <Icon name="home" size={30} color={focused ? "#288DCF" : "#cccccc"} />
        ),
        showIcon: true
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: (tintColor, focused) => (
          <Icon
            name="search"
            size={30}
            color={focused ? "#288DCF" : "#cccccc"}
          />
        ),
        showIcon: true,
        tabBarVisible: false
      }
    },

    AddEvent: {
      screen: AddEvent,
      navigationOptions: {
        tabBarIcon: (tintColor, focused) => (
          <Icon
            name="add-box"
            size={30}
            color={focused ? "#288DCF" : "#cccccc"}
          />
        ),
        showIcon: true,
        tabBarVisible: false
      }
    },
    Notification: {
      screen: UserNotification,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name="notifications"
            size={30}
            color={focused ? "#288DCF" : "#cccccc"}
          />
        ),
        showIcon: true
      }
    },
    Info: {
      screen: Info,
      navigationOptions: {
        tabBarIcon: (tintColor, focused) => (
          <Icon name="info" size={30} color={focused ? "#288DCF" : "#cccccc"} />
        ),
        showIcon: true
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      labelStyle: {
        fontSize: 14

        //lineHeight: 20,
        //fontFamily: "CircularStd-Book"
      },
      activeTintColor: "#288DCF",
      style: {
        backgroundColor: "#243545"
      }
      //tintColor: "black",
    }
  }
);
const RootNavigator = createStackNavigator(
  {
    p1: TabNavigator,
    P2: StackNavigator
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppContainer = createAppContainer(RootNavigator);
export default AppContainer;
