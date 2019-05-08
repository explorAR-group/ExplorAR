'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      northPointX: 0,
      northPointZ: 0,
      southPointX: 0,
      southPointZ: 0,
      eastPointX: 0,
      eastPointZ: 0,
      westPointX: 0,
      westPointZ: 0,
      latitude: 0,
      longitude: 0,
      error: null
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // componentDidMount() {
  //   this.watchId = navigator.geolocation.watchPosition(
  //     position => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null
  //       });
  //     },
  //     error => this.setState({ error: error.message }),
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 2000,
  //       maximumAge: 0,
  //       distanceFilter: 1
  //     }
  //   );
  // }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.2, 2, 0.2]}
          position={[0, -2, -5]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="N st)"
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[this.state.northPointX, 0, this.state.northPointZ]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="S Lenwich"
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[this.state.southPointX, 0, this.state.southPointZ]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="W ValJ"
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[this.state.westPointX, 0, this.state.westPointZ]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text="E Starbucks"
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[this.state.eastPointX, 0, this.state.eastPointZ]}
          style={styles.helloWorldTextStyle}
        />
        {/* <ViroText
          text={this.state.latitude.toString()}
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[0, -1, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text={this.state.longitude.toString()}
          scale={[3, 3, 3]}
          transformBehaviors={['billboard']}
          position={[0, -1, -3]}
          style={styles.helloWorldTextStyle}
        /> */}
      </ViroARScene>
    );
  }

  _onInitialized() {
    var northPoint = this._transformPointToAR(40.705247, -74.009426);
    var eastPoint = this._transformPointToAR(40.704701, -74.008999);
    var westPoint = this._transformPointToAR(40.776831, -73.962008);
    var southPoint = this._transformPointToAR(40.704805, -74.008927);
    console.log(
      'obj north final x:' + northPoint.x + 'final z:' + northPoint.z
    );
    console.log(
      'obj south final x:' + southPoint.x + 'final z:' + southPoint.z
    );
    console.log('obj east point x' + eastPoint.x + 'final z' + eastPoint.z);
    console.log('obj west point x' + westPoint.x + 'final z' + westPoint.z);
    this.setState({
      northPointX: northPoint.x,
      northPointZ: northPoint.z,
      southPointX: southPoint.x,
      southPointZ: southPoint.z,
      eastPointX: eastPoint.x,
      eastPointZ: eastPoint.z,
      westPointX: westPoint.x,
      westPointZ: westPoint.z,
      text: 'AR Init called.'
    });
  }

  _latLongToMerc(lat_deg, lon_deg) {
    var lon_rad = (lon_deg / 180.0) * Math.PI;
    var lat_rad = (lat_deg / 180.0) * Math.PI;
    var sm_a = 6378137.0;
    var xmeters = sm_a * lon_rad;
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
    return { x: xmeters, y: ymeters };
  }

  _transformPointToAR(lat, long) {
    var objPoint = this._latLongToMerc(lat, long);
    var devicePoint = this._latLongToMerc(
      this.state.latitude,
      this.state.longitude
    );
    // var devicePoint = this._latLongToMerc(40.704986, -74.009029);
    console.log('objPointZ: ' + objPoint.y + ', objPointX: ' + objPoint.x);
    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    return { x: objFinalPosX, z: -objFinalPosZ };
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = HelloWorldSceneAR;
