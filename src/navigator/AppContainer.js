import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import ViewFeed from "../components/ViewFeed/ViewFeed";
import MyPosts from "../screens/MyPosts/MyPosts";
import Home from "../screens/Home/Home";
import AddEvent from "../screens/AddEvent/AddEvent";
import Profile from "../screens/Profile/Profile";
import UserNotification from "../screens/UserNotification/UserNotification";
import Search from "../screens/Search/Search";
import React, { Component } from "react";
import Info from "../screens/Info/Info";
import Login from "../screens/Login/Login";
import Request from "../screens/Request/Request";
import UserInfo from "../screens/UserInfo/UserInfo";
import UserPosts from "../screens/UserPosts/UserPosts";
import Main from "../screens/Main/Main";
import AboutUs from "../screens/AboutUs/AboutUs";
import ReportProblem from "../screens/ReportProblem/ReportProblem";
import UserJoiningRequests from "../screens/UserJoiningRequests/UserJoiningRequests";
import Broadcast from "../screens/Broadcast/Broadcast";
const StackNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator2 = createStackNavigator(
  {
    MyPosts: {
      screen: MyPosts
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator3 = createStackNavigator(
  {
    ViewFeed: {
      screen: ViewFeed
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator4 = createStackNavigator(
  {
    UserInfo: {
      screen: UserInfo
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const StackNavigator5 = createStackNavigator(
  {
    UserPosts: {
      screen: UserPosts
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator6 = createStackNavigator(
  {
    Main: {
      screen: Main
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator7 = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUs
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator8 = createStackNavigator(
  {
    ReportProblem: {
      screen: ReportProblem
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator9 = createStackNavigator(
  {
    UserJoiningRequests: {
      screen: UserJoiningRequests
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator10 = createStackNavigator(
  {
    Broadcast: {
      screen: Broadcast
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator1 = createStackNavigator(
  {
    Login: Login,
    Request: Request
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    },
    initialRouteName: "Login"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (tintColor, focused, active) => (
          <Icon name="home" size={30} color={focused ? "#288DCF" : "white"} />
        ),
        showIcon: true
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: (tintColor, focused) => (
          <Icon name="search" size={30} color={focused ? "#288DCF" : "white"} />
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
            color={focused ? "#288DCF" : "white"}
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
            color={focused ? "white" : "white"}
          />
        ),
        showIcon: true
      }
    },
    Info: {
      screen: Info,
      navigationOptions: {
        tabBarIcon: (tintColor, focused) => (
          <Icon name="info" size={30} color={focused ? "#288DCF" : "white"} />
        ),
        showIcon: true,
        tabBarVisible: false
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
      activeTintColor: "white",
      style: {
        backgroundColor: "#2F497E"
      }
      //tintColor: "black",
    }
  }
);
const RootNavigator = createStackNavigator(
  {
    p0: StackNavigator6,
    p1: StackNavigator1,
    p2: TabNavigator,
    P3: StackNavigator,
    p4: StackNavigator2,
    p5: StackNavigator3,
    p6: StackNavigator4,
    p7: StackNavigator5,
    p8: StackNavigator7,
    p9: StackNavigator8,
    p10: StackNavigator9,
    p11: StackNavigator10
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