'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroARScene, ViroText } from 'react-viro';
import axios from 'axios';

export default class PointOfInterest extends Component {
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

    // translate lat long to local and set state

    // data.map(poi => {
    //   this.setState({
    //     [poi.id]: poi
    //   });
    // });
    // var northPoint = this._transformPointToAR(40.705247, -74.009426);
  }

  render() {
    console.warn(this.state.POIs, 'this.state.POIs');

    return (
      <ViroARScene onTrackingInitialized={this._onInitialized}>
        {this.state.POIs.map(poi => {
          return (
            <ViroText
              text={String(poi.name)}
              scale={[3, 3, 3]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                console.warn(typeof point.x, 'typeof pointx');
                console.warn(point.x, 'pointx');
                console.warn(point.z, 'pointz');

                return [point.x, 0, point.z];
              })()}
              style={styles.helloWorldTextStyle}
            />
          );
        })}

        {/* {this.state.POIs.map(poi => {
          return (
            <ViroText
              text={String(poi.name)}
              scale={[0.5, 0.5, 0.5]}
              position={(() => {
                return [0, 0, poi.id * -1.5];
              })()}
              style={styles.helloWorldTextStyle}
            />
          );
        })} */}
        {/* <ViroText
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
        /> */}
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
    var devicePoint = this._latLongToMerc(40.705107, -74.00916);
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
