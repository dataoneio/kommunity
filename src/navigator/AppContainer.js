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
import Verify from "../screens/Verify/Verify";
import Request from "../screens/Request/Request";
import UserInfo from "../screens/UserInfo/UserInfo";
import UserPosts from "../screens/UserPosts/UserPosts";
import Main from "../screens/Main/Main";
import AboutUs from "../screens/AboutUs/AboutUs";
import ReportProblem from "../screens/ReportProblem/ReportProblem";
import UserJoiningRequests from "../screens/UserJoiningRequests/UserJoiningRequests";
import Broadcast from "../screens/Broadcast/Broadcast";
import HomeNavigator from "../screens/HomeNavigator/HomeNavigator";
import News from "../screens/News/News";
import BloodBook from "../screens/BloodBook/BloodBook";
import AddressBook from "../screens/AddressBook/AddressBook";
import CityUsers from "../screens/CityUsers/CityUsers";
import BroadcastedPost from "../screens/BroadcastedPost/BroadcastedPost";
import BloodBankUsers from "../screens/BloodBankUsers/BloodBankUsers";
import CommunityList from "../screens/CommunityList/CommunityList";
import AddCommunity from "../screens/AddCommunity/AddCommunity";
import AddAdmin from "../screens/AddAdmin/AddAdmin";
import Matrimonial from "../screens/Matrimonial/Matrimonial";
import MatrimonialForm from "../screens/MatrimonialForm/MatrimonialForm"
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
const StackNavigator27 = createStackNavigator(
  {
    Matrimonial: {
      screen: Matrimonial
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator28 = createStackNavigator(
  {
    MatrimonialForm: {
      screen: MatrimonialForm
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator15 = createStackNavigator(
  {
    AddressBook: {
      screen: AddressBook
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const StackNavigator23 = createStackNavigator(
  {
    CommunityList: {
      screen: CommunityList
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator25 = createStackNavigator(
  {
    AddAdmin: {
      screen: AddAdmin
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
const StackNavigator16 = createStackNavigator(
  {
    CityUsers: {
      screen: CityUsers
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator11 = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator12 = createStackNavigator(
  {
    News: {
      screen: News
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator13 = createStackNavigator(
  {
    Search: {
      screen: Search
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator14 = createStackNavigator(
  {
    BloodBook: {
      screen: BloodBook
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator17 = createStackNavigator(
  {
    BroadcastedPost: {
      screen: BroadcastedPost
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator18 = createStackNavigator(
  {
    BloodBankUsers: {
      screen: BloodBankUsers
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator19 = createStackNavigator(
  {
    Info: {
      screen: Info
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator20 = createStackNavigator(
  {
    Notification: {
      screen: UserNotification
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator21 = createStackNavigator(
  {
    AddEvent: {
      screen: AddEvent
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator24 = createStackNavigator(
  {
    AddCommunity: {
      screen: AddCommunity
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const StackNavigator22 = createStackNavigator(
  {
    Home: {
      screen: Home
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

const StackNavigator26 = createStackNavigator(
  {
    Verify: {
      screen: Verify
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);



// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         tabBarIcon: (tintColor, focused, active) => (
//           <Icon name="home" size={30} color={focused ? "#288DCF" : "white"} />
//         ),
//         showIcon: true
//       }
//     }
//     // Search: {
//     //   screen: Search,
//     //   navigationOptions: {
//     //     tabBarIcon: (tintColor, focused) => (
//     //       <Icon name="search" size={30} color={focused ? "#288DCF" : "white"} />
//     //     ),
//     //     showIcon: true,
//     //     tabBarVisible: false
//     //   }
//     // },

//     // AddEvent: {
//     //   screen: AddEvent,
//     //   navigationOptions: {
//     //     tabBarIcon: (tintColor, focused) => (
//     //       <Icon
//     //         name="add-box"
//     //         size={30}
//     //         color={focused ? "#288DCF" : "white"}
//     //       />
//     //     ),
//     //     showIcon: true,
//     //     tabBarVisible: false
//     //   }
//     // }
//     // Notification: {
//     //   screen: UserNotification,
//     //   navigationOptions: {
//     //     tabBarIcon: ({ tintColor, focused }) => (
//     //       <Icon
//     //         name="notifications"
//     //         size={30}
//     //         color={focused ? "white" : "white"}
//     //       />
//     //     ),
//     //     showIcon: true
//     //   }
//     // }
//     // Info: {
//     //   screen: Info,
//     //   navigationOptions: {
//     //     tabBarIcon: (tintColor, focused) => (
//     //       <Icon name="info" size={30} color={focused ? "#288DCF" : "white"} />
//     //     ),
//     //     showIcon: true,
//     //     tabBarVisible: false
//     //   }
//     // }
//   },
//   {
//     initialRouteName: "Home",
//     tabBarOptions: {
//       labelStyle: {
//         fontSize: 14

//         //lineHeight: 20,
//         //fontFamily: "CircularStd-Book"
//       },
//       activeTintColor: "white",
//       style: {
//         backgroundColor: "#C60C31"
//       }
//       //tintColor: "black",
//     }
//   }
// );

const RootNavigator = createStackNavigator(
  {
    p0: StackNavigator6,
    p1: StackNavigator1,
    p2: StackNavigator22,
    P3: StackNavigator,
    p4: StackNavigator2,
    p5: StackNavigator3,
    p6: StackNavigator4,
    p7: StackNavigator5,
    p8: StackNavigator7,
    p9: StackNavigator8,
    p10: StackNavigator9,
    p11: StackNavigator10,
    p12: StackNavigator11,
    p13: StackNavigator12,
    p14: StackNavigator13,
    p15: StackNavigator14,
    p16: StackNavigator15,
    p17: StackNavigator16,
    p18: StackNavigator17,
    p19: StackNavigator18,
    p20: StackNavigator19,
    p21: StackNavigator20,
    p22: StackNavigator21,
    p23: StackNavigator23,
    p24: StackNavigator24,
    p25: StackNavigator25,
    p26:StackNavigator26,
    p27: StackNavigator27,
    p28: StackNavigator28,
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
