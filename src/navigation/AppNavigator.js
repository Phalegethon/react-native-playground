
import React from "react";
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems, NavigationActions } from "react-navigation";


// containers
import Launch from "../containers/Launch/Launch.container.js";
import Login from "../containers/Login/Login.container.js";


// import styles from "./AppNavigator.Styles";
// import {
//   Button
// } from "ui";



//
// ─── TAB NAVIGATOR ──────────────────────────────────────────────────────────────
//
// const TabNavigatorScreens = TabNavigator(
//   {
//     Home: {
//       screen: Home,
//       path: "home"
//     }
//   },
//   {
//     // tabBarComponent: true, // component to use as the tab bar, e.g. TabBarBottom (this is the default on iOS), TabBarTop (this is the default on Android)
//     // tabBarPosition: "top", // position of the tab bar, can be 'top' or 'bottom'
//     swipeEnabled: false, // whether to allow swiping between tabs
//     // animationEnabled: true, // whether to animate when changing tabs
//     // lazy: true, // whether to lazily render tabs as needed as opposed to rendering them upfront
//     initialRouteName: "Home", // The routeName for the initial tab route when first loading
//     // order: [], // Array of routeNames which defines the order of the tabs
//     // paths: true, // Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
//     backBehavior: "Home", // Should the back button cause a tab switch to the initial tab? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
//     tabBarOptions: {
//       activeTintColor: "black"
//     }
//   }
// );




//
// ─── DRAWER NAVIGATOR ────────────────────────────────────────────────────────────
//
const DrawerNavigatorScreens = DrawerNavigator(
  {
    Launch: {
      screen: Launch,
      path: "launch"
    },
    Login: {
      screen: Login,
      path: "login"
    }
    // Home: {
    //   screen: Home,
    //   path: "home"
    // },
    // About: {
    //   screen: About,
    //   path: "about"
    // },
    // Kit: {
    //   screen: Kit,
    //   path: "kit"
    // }
  },
  {
    initialRouteName: "Login", //The routeName for the initial route.
    // order: [], //Array of routeNames which defines the order of the drawer items.
    // paths: () => { }, //Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
    // backBehavior: true, //Should the back button cause switch to the initial route? If yes, set to initialRoute, otherwise none.Defaults to initialRoute behavior.
    // Configure the drawer content, see below.
    contentOptions: {
      drawerWidth: 300, // Width of the drawer
      drawerPosition: "left" // Options are left or right.Default is left position.
      // Component used to render the content of the drawer, for example, navigation items.Receives the navigation prop for the drawer. Defaults to DrawerItems.
      // contentComponent: (props) =>
      //   <View style={style.container}>
      //     <DrawerItems {...props} />
      //   </View>,
    }
  }
);







//
// ─── APP NAVIGATOR ──────────────────────────────────────────────────────────────
//
const AppNavigator = StackNavigator(
  {
    Launch: {
      screen: Launch,
      header: {
        visible: false
      }
    },
    Drawer: {
      screen: DrawerNavigatorScreens
    },
    Login: {
      screen: Login,
      path: "login"
    }
    // CouponDetail: {
    //   screen: CouponDetail,
    //   path: "coupon-detail/:couponId"
    // }
  },
  {
    headerMode: "screen", //Specifies how the header should be rendered:
    initialRouteName: "Drawer", //Sets the default screen of the stack. Must match one of the keys in route configs.
    navigationOptions: { //Default navigation options to use for screens
      headerStyle: {
        backgroundColor: "lightgrey"
      },
      headerRight: null // React Element to display on the left side of the header
    }
    // initialRouteParams: {}, //The params for the initial route
    // paths: () => { }, //A mapping of overrides for the paths set in the route configs
    // mode: "modal", //Defines the style for rendering and transitions:
    // card - Use the standard iOS and Android screen transitions. This is the default.
    // modal - Make the screens slide in from the bottom which is a common iOS pattern.Only works on iOS, has no effect on Android.
    // float Render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.
    // // screen Each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android.
    // none No header will be rendered.
    // cardStyle: true, //Use this prop to override or extend the default style for an individual card in stack.
    // transitionConfig: true, //Function to return an object that overrides default screen transitions.
    // onTransitionStart: true, //Function to be invoked when the card transition animation is about to start.
    // onTransitionEnd: true, //Function to be invoked once the card transition animation completes.
  }
);


export default AppNavigator;






// import { StackNavigator } from "react-navigation";


// // containers
// import Launch from "../containers/Launch/Launch.container.js";
// import Login from "../containers/Login/Login.container.js";


// import styles from "./Styles/NavigationStyles";

// export const AppNavigator = StackNavigator(
//   {
//     Launch: {
//       screen: Launch
//     },
//     Login: {
//       screen: Login
//     }
//   },
//   {
//     headerMode: "none",
//     initialRouteName: "Launch",
//     navigationOptions: {
//       headerStyle: styles.header
//     }
//   }
// );


// export default AppNavigator;
