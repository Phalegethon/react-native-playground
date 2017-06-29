/* eslint-disable flowtype/require-parameter-type */
/* eslint-disable flowtype/require-return-type */

import React, {  Component  } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators  } from "redux";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from "react-native";




import * as loginActions from "./Login.actions";
import styles from "./Login.styles.js";


class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerMode: "screen",
    title: "Login",
    headerRight: null,
    headerLeft: null
  });

  constructor(props, context) {
    super(props, context);
    console.log("props ", props);
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
      <View>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
        <Text>Login 123123123123 1312312 3123</Text>
      </View>
    );
  }
}

Login.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  formState: PropTypes.object
};

Login.contextTypes = {
};

const mapStateToProps = (state) => {
  return {
    state: state.login,
    formState: state.form
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch),
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);

