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
    let x = '5';

    const { data } = await axios.get(
      'https://api.binance.com/api/v1/depth?symbol=LTCBTC'
    );

    const newData = { ask: data.asks[0][0], bid: data.bids[0][0] };
    let newTest = String(newData.ask);
    console.log(newData, '!!!!!!!!!!!!!!!!');
    this.setState({ text: newTest });
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
