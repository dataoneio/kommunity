import Info from "./files/Info";
import MyPosts from "./files/MyPosts";
import { createStackNavigator, createAppContainer } from "react-navigation";

const stackNav = createStackNavigator({
  Info: {
    screen: Info
  },
  MyPosts: {
    screen: MyPosts
  }
});
const StackContainer = createAppContainer(stackNav);
export default StackContainer;
