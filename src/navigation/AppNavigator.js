import { StackNavigator } from "react-navigation";


// containers
import Launch from "../containers/Launch/Launch.container.js";


import styles from "./Styles/NavigationStyles";

export const AppNavigator = StackNavigator(
  {
    Launch: {
      screen: Launch
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
