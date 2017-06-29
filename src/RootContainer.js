import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";

import AppNavigationWithState from "./navigation/AppNavigationWithState.js";


// Styles
import styles from "./RootContainerStyles";

class RootContainer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  // componentWillMount() {}
  // componentDidMount() {}
  // componentWillReceiveProps(nextProps, nextContext) {}
  // shouldComponentUpdate(nextProps, nextState, nextContext) {}
  // componentWillUpdate(nextProps, nextState, nextContext) {}
  // componentDidUpdate(prevProps, prevState, prevContext)
  // componentWillUnmount() {}

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <AppNavigationWithState />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch({
    type: "##app/INIT_START"
  })
});

export default connect(null, mapDispatchToProps)(RootContainer);
