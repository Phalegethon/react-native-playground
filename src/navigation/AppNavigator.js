import { StackNavigator } from "react-navigation";


// containers
import Launch from "../containers/Launch/Launch.container.js";
import Login from "../containers/Login/Login.container.js";



import styles from "./Styles/NavigationStyles";

export const AppNavigator = StackNavigator(
  {
    Launch: {
      screen: Launch
    },
    Login: {
      screen: Login
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Launch",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);


export default AppNavigator;
