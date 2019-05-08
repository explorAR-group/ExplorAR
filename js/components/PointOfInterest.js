'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ViroARScene, ViroText, ViroImage } from 'react-viro';
import axios from 'axios';

export default class PointOfInterest extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      error: null,
      POIs: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  async componentDidMount() {
    // get location info for device
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

    // get API info from backend for POIs
    const { data } = await axios.get(
      'http://172.16.23.29:8080/api/pointsOfInterest'
    );
    this.setState({ POIs: data });
  }

  render() {
    console.warn(this.state.POIs, 'this.state.POIs');

    return (
      <ViroARScene onTrackingInitialized={this._onInitialized}>
        {this.state.POIs.map(poi => {
          return (
            <ViroText
              key={poi.id}
              text={String(poi.name)}
              extrusionDepth={8}
              scale={[3, 3, 3]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                return [point.x, 0, point.z];
              })()}
              style={styles.helloWorldTextStyle}
            />
          );
        })}
        {this.state.POIs.map(poi => {
          return (
            <ViroImage
              key={poi.id}
              source={{ uri: poi.imageUrl }}
              scale={[3, 3, 3]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                return [point.x + 5, 0, point.z];
              })()}
            />
          );
        })}
      </ViroARScene>
    );
  }

  _onInitialized() {
    // var northPoint = this._transformPointToAR(40.705247, -74.009426);
    // var eastPoint = this._transformPointToAR(40.704701, -74.008999);
    // var westPoint = this._transformPointToAR(40.776831, -73.962008);
    // var southPoint = this._transformPointToAR(40.704805, -74.008927);
    // this.setState({
    //   northPointX: northPoint.x,
    //   northPointZ: northPoint.z,
    //   southPointX: southPoint.x,
    //   southPointZ: southPoint.z,
    //   eastPointX: eastPoint.x,
    //   eastPointZ: eastPoint.z,
    //   westPointX: westPoint.x,
    //   westPointZ: westPoint.z,
    //   text: 'AR Init called.'
    // });
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
    // var devicePoint = this._latLongToMerc(
    //   this.state.latitude,
    //   this.state.longitude
    // );
    var devicePoint = this._latLongToMerc(40.7049444, -74.0091771);
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

module.exports = PointOfInterest;
