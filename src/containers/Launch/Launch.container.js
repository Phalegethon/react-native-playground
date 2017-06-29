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

import Images from "../../themes/Images.js";



import * as launchActions from "./Launch.actions";
import styles from "./Launch.styles.js";


class Launch extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerMode: "screen",
    title: "Launch Screen",
    headerRight: null,
    headerLeft: null,
    headerTintColor: "black"
  });

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
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <ScrollView style={styles.container}>

          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              !This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

Launch.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  formState: PropTypes.object
};

Launch.contextTypes = {
};

const mapStateToProps = (state) => {
  return {
    state: state.launch,
    formState: state.form
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(launchActions, dispatch),
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(Launch);

