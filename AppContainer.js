import { createAppContainer,createStackNavigator } from 'react-navigation';
// you can also import from @react-navigation/native
import Home from "./files/Home";
import UserNotification from "./files/UserNotification";
import AddEvent from "./files/AddEvent";
import profile from "./files/Profile";
//import { colors } from 'react-native-elements';
const AppNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        News: { screen: UserNotification },
        Add: { screen: AddEvent },
        profile: { screen: profile }
      },
      {
        initialRouteName: "Home",
        backgroundcolor:'#0d0d0d',
        headerTintColor:'#0d0d0d',
        colors:'#0d0d0d',
 
        headerMode: 'screen',
        navigationOptions: {
          headerStyle: {
            backgroundColor: "#0d0d0d",
            colors: "0d0d0d  "
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerBackTitle: null
        }
      }
 );
 
 const AppContainer = createAppContainer(AppNavigator);
 
 // Now AppContainer is the main component for React to render
 
 export default AppContainer;