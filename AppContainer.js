import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import Home from "./files/Home";
import AddEvent from "./files/AddEvent";
import Profile from "./files/Profile";
import UserNotification from "./files/UserNotification";

const TabNavigator = createBottomTabNavigator(
    {
      Home: { screen: Home },
      Profile: { screen: Profile },
      AddEvent: { screen: AddEvent },
      Notification: { screen: UserNotification },


      
    },
    {
      initialRouteName: "Home"
    }
  );
  
  const AppContainer = createAppContainer(TabNavigator);
  export default AppContainer;
  