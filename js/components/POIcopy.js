"use strict";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ViroARScene, ViroText, ViroImage } from "react-viro";
import axios from "axios";
import { copyFileSync } from "fs";
import { API_URL } from "../../constants";

export default class PointOfInterest extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      error: null,
      POIs: [],
      latitude: 0,
      longitude: 0,
      farPOIs: []
    };

    // bind 'this' to functions
    this._onUpdated = this._onUpdated.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this.onClickName = this.onClickName.bind(this);
  }

  async componentDidMount() {
    // get location info for device - SETUP
    console.warn(this, "this within component did mount");

    // get API info from backend for POIs
    let { data } = await axios.get(`${API_URL}/api/pointsOfInterest`);
    //add fullview
    data = data.map(poi => {
      poi.fullView = false;
      return poi;
    });

    //   await new Promise((resolve, reject) => {
    //     let success = async position => {
    //       currentLat = position.coords.latitude;
    //       console.warn(this, 'this within success');

    //       console.warn(position.coords.latitude, 'pos coords lat');
    //       currentLong = position.coords.longitude;
    //       console.warn(currentLat, 'current lat');
    //       await this.setState({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude
    //       });
    //       resolve();
    //     };

    //     function error(err) {
    //       console.warn(`ERROR(${err.code}): ${err.message}`);
    //       reject(err);
    //     }

    //     let options = {
    //       enableHighAccuracy: true,
    //       timeout: 2000,
    //       maximumAge: 0
    //     };

    //     navigator.geolocation.getCurrentPosition(success, error, options);
    //   });

    //   console.warn('res banana', res);
    // } catch (err) {
    //   console.warn(err);
    // }

    console.warn(currentLat, "current lat END");
    console.warn(this.state.latitude, "this.state.lat END");

    // get POI and Restaurant info from backend
    try {
      let { data } = await axios.get(
        `http://172.16.23.29:8080/api/pointsOfInterest/?lat=${
          this.state.latitude
        }&long=${this.state.longitude}`
      );

      //add fullview
      data = data.map(poi => {
        poi.fullView = false;
        return poi;
      });

      this.setState({ POIs: data });

      //Creating new set of POIs based on far distance
      // this.state.POIs.filter(elem => elem.longitude > 300)

      let tempArr = this.state.POIs.map(poi => {
        let point = this._transformPointToAR(poi.latitude, poi.longitude);
        poi.x = point.x;
        poi.z = point.z;
        return poi;
      });

      tempArr = tempArr.filter(
        poi => Math.abs(poi.x) > 200 || Math.abs(poi.z) > 200
      );
      this.setState({ farPOIs: tempArr });
    } catch (err) {
      console.warn(err);
    }
  }

  onClickName(id) {
    let copyPOI = this.state.POIs;
    copyPOI.map(poi => {
      if (poi.id === id) {
        poi.fullView = !poi.fullView;
      }
      return poi;
    });
    this.setState({ POIs: copyPOI });
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onUpdated}>
        {/* POI NAME */}
        {this.state.POIs.map(poi => {
          return (
            <ViroText
              onClick={this.onClickName(poi.id)}
              transformBehaviors={["billboard"]}
              key={poi.id}
              text={String(poi.name)}
              extrusionDepth={8}
              scale={[3, 3, 3]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                return [point.x, 2, point.z];
              })()}
              style={styles[poi.category]}
            />
          );
        })}
        {/* POI DESCRIPTION */}
        {this.state.POIs.map(poi => {
          if (poi.fullView) {
            return (
              <ViroText
                transformBehaviors={["billboard"]}
                key={poi.id}
                text={String(poi.description)}
                extrusionDepth={2}
                height={3}
                width={3}
                scale={[3, 3, 3]}
                textAlignVertical="top"
                textLineBreakMode="justify"
                textClipMode="clipToBounds"
                position={(() => {
                  let point = this._transformPointToAR(
                    poi.latitude,
                    poi.longitude
                  );
                  return [point.x, -4, point.z];
                })()}
                style={styles.descriptionTextStyle}
              />
            );
          }
        })}
        {/* POI IMAGE */}
        {this.state.POIs.map(poi => {
          if (poi.fullView) {
            return (
              <ViroImage
                transformBehaviors={["billboard"]}
                key={poi.id}
                source={{ uri: poi.imageUrl }}
                scale={[5, 5, 5]}
                position={(() => {
                  let point = this._transformPointToAR(
                    poi.latitude,
                    poi.longitude
                  );
                  return [point.x, 7, point.z];
                })()}
              />
            );
          }
        })}
        {this.state.farPOIs.map(poi => {
          return (
            <ViroText
              transformBehaviors={["billboard"]}
              key={poi.id}
              text={String(poi.name)}
              extrusionDepth={8}
              scale={[3, 3, 3]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                return [point.x * 0.05, 0, point.z * 0.05];
              })()}
              style={styles[poi.category]}
            />
          );
        })}
        {this.state.farPOIs.map(poi => {
          return (
            <ViroText
              transformBehaviors={["billboard"]}
              key={poi.id}
              text="!"
              extrusionDepth={8}
              scale={[15, 15, 15]}
              position={(() => {
                let point = this._transformPointToAR(
                  poi.latitude,
                  poi.longitude
                );
                return [point.x * 0.05, 3, point.z * 0.05];
              })()}
              style={styles[poi.category]}
            />
          );
        })}
      </ViroARScene>
    );
  }

  _onUpdated() {}

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
    // var devicePoint = this._latLongToMerc(40.7049444, -74.0091771);

    //
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
    fontFamily: "Arial",
    fontSize: 30,
    color: "#000000",
    textAlignVertical: "center",
    textAlign: "center"
  },
  Bars: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#1e90ff",
    textAlignVertical: "center",
    textAlign: "center"
  },

  descriptionTextStyle: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#FFFFFF",
    fontStyle: "italic",
    textAlign: "center"
  }
});

module.exports = PointOfInterest;
