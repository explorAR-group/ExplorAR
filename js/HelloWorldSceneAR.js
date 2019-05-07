'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

import axios from 'axios';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...'
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get(
      'http://172.16.23.29:8080/api/pointsOfInterest'
    );
    console.warn(data, 'data');
    let newTest = String(data[0].name);
    this.setState({ text: newTest });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // this.setState({
      //   text: "Hello World!"
      // });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = HelloWorldSceneAR;
