import React, { Component } from "react";

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from "react-native";

import { ViroARSceneNavigator } from "react-viro";

var InitialARScene = require("./js/HelloWorldSceneAR");

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      inViro: false
    };

    this._switchToViro = this._switchToViro.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.inViro) {
      return (
        <View style={localStyles.outer}>
          <ViroARSceneNavigator
            apiKey="C63BC372-68BB-4F10-B21A-7EC8E1ABFFC0"
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
    } else {
      return (
        <View style={localStyles.outer}>
          <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>Ready to enter AR?</Text>

            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._switchToViro}
              underlayColor={"#68a0ff"}
            >
              <Text style={localStyles.buttonText}>Let's Go!</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }

  _switchToViro() {
    this.setState({
      inViro: true
    });
  }

  _exitViro() {
    this.setState({
      inViro: false
    });
  }
}

var localStyles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
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
  }
});

// AppRegistry.registerComponent('YOUR_PROJECT_NAME', () => ViroSample);

// // The below line is necessary for use with the TestBed App
// AppRegistry.registerComponent('ViroSample', () => ViroSample);

// AppRegistry.registerComponent('ViroSample', () => ViroSample);
