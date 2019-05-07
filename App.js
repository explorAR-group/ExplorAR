import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store/index";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from "react-native";
import AuthForm from "./js/components/authForm";
import { ViroARSceneNavigator } from "react-viro";

var sharedProps = {
  apiKey: "C63BC372-68BB-4F10-B21A-7EC8E1ABFFC0"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/HelloWorldSceneAR");

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var LOGIN = "LOGIN";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // firstScreen() {
  //   if (this.state.navigatorType == UNSET) {
  //     return this._getExperienceSelector();
  //   } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
  //     return this._getARNavigator();
  //   } else if (this.state.navigatorType == LOGIN) {
  //     // Returns the user login page
  //     return (
  //       <Provider store={store}>
  //         <AuthForm />
  //       </Provider>
  //     );
  //   }
  // }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.?????
  render() {
    console.log(this.state);
    // return this.firstScreen();
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == LOGIN) {
      // Returns the user login page
      return (
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );
    }
  }

  // Presents the user with a start AR experience button
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LOGIN)}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 10,
            alignItems: "center"
          }}
        >
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._exitViro}
            underlayColor={"#00000000"}
          >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

module.exports = ViroSample;
