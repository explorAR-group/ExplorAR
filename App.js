import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import AuthForm from './js/components/authForm';
import { Provider } from 'react-redux';
import store from './js/store/index';

<<<<<<< HEAD
const InitialARScene = require("./js/components/PointOfInterest.js");
=======
const InitialARScene = require('./js/components/PointOfInterest');
>>>>>>> master

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      inAR: false
    };

    this._switchToAR = this._switchToAR.bind(this);
    this._exitAR = this._exitAR.bind(this);
  }

  render() {
    if (this.state.inAR) {
      return (
        <View style={styles.outer}>
          <ViroARSceneNavigator
            apiKey="C63BC372-68BB-4F10-B21A-7EC8E1ABFFC0"
            worldAlignment="GravityAndHeading"
            initialScene={{ scene: InitialARScene }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 10,
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => {
                this._exitAR();
              }}
            >
              <Text style={styles.exitButtonText}>Exit AR</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <AuthForm switchToAR={this._switchToAR} />
        </Provider>
      );
    }
  }

  _switchToAR() {
    this.setState({
      inAR: true
    });
  }

  _exitAR() {
    this.setState({
      inAR: false
    });
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  exitButton: {
    alignItems: 'center',
    backgroundColor: '#6e6e6e',
    padding: 10
  },
  exitButtonText: {
    color: '#ffffff'
  }
});
