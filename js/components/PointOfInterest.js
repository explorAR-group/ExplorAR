'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getAllPoisThunk, toggleFullview } from '../store/poi.js';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';
import axios from 'axios';
import { LOCALIP } from '../../constants';

var currentLat;
var currentLong;

export class PointOfInterest extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      latitude: 40.7049444,
      longitude: -74.0091771
    };

    // bind 'this' to functions
    this._onUpdated = this._onUpdated.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  async componentDidMount() {
    this.props.getAllPoisThunk(this.state.latitude, this.state.longitude);
  }

  render() {
    let { selectedPois } = this.props;

    return (
      <ViroARScene onTrackingUpdated={this._onUpdated}>
        {/* POI NAME */}
        {selectedPois &&
          selectedPois.map(poi => {
            return (
              <ViroText
                onClick={() => this.props.toggleFullview(poi.id)}
                transformBehaviors={['billboard']}
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
        {selectedPois &&
          selectedPois.map(poi => {
            if (poi.fullView) {
              return (
                <ViroText
                  transformBehaviors={['billboard']}
                  key={poi.id}
                  text={String(poi.description || poi.address)}
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
        {selectedPois &&
          selectedPois.map(poi => {
            if (poi.fullView) {
              return (
                <ViroImage
                  transformBehaviors={['billboard']}
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
        {selectedPois &&
          selectedPois.map(poi => {
            {
              /* BACKGROUND */
            }
            if (poi.fullView) {
              return (
                <ViroImage
                  transformBehaviors={['billboard']}
                  onClick={() => this.props.toggleFullview(poi.id)}
                  key={poi.id}
                  source={require('../res/1pxgrey.png')}
                  scale={[10, 15, 10]}
                  opacity={0.9}
                  position={(() => {
                    let point = this._transformPointToAR(
                      poi.latitude,
                      poi.longitude
                    );
                    return [point.x * 1.05, 1.25, point.z * 1.05];
                  })()}
                />
              );
            }
          })}
        {selectedPois &&
          selectedPois.map(poi => {
            {
              /* BACKGROUND */
            }
            if (!poi.fullView) {
              let marker;

              if (poi.category === 'Bars') {
                {
                  /* MAP MARKER */
                }
                marker = (
                  <ViroImage
                    transformBehaviors={['billboard']}
                    key={poi.id}
                    source={require('../res/BarsPOImarker.png')}
                    scale={[3, 3, 3]}
                    position={(() => {
                      let point = this._transformPointToAR(
                        poi.latitude,
                        poi.longitude
                      );
                      return [point.x * 0.95, 6, point.z * 0.95];
                    })()}
                  />
                );
              } else if (poi.category === 'Restaurants') {
                {
                  /* MAP MARKER */
                }
                marker = (
                  <ViroImage
                    transformBehaviors={['billboard']}
                    key={poi.id}
                    source={require('../res/RestaurantsPOImarker.png')}
                    scale={[3, 3, 3]}
                    position={(() => {
                      let point = this._transformPointToAR(
                        poi.latitude,
                        poi.longitude
                      );
                      return [point.x * 0.95, 6, point.z * 0.95];
                    })()}
                  />
                );
              } else if (poi.category === 'Attractions') {
                {
                  /* MAP MARKER */
                }
                marker = (
                  <ViroImage
                    transformBehaviors={['billboard']}
                    key={poi.id}
                    source={require('../res/AttractionsPOImarker.png')}
                    scale={[3, 3, 3]}
                    position={(() => {
                      let point = this._transformPointToAR(
                        poi.latitude,
                        poi.longitude
                      );
                      return [point.x * 0.95, 6, point.z * 0.95];
                    })()}
                  />
                );
              }
              return <>{marker}</>;
            }
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
    // var devicePoint = this._latLongToMerc(
    //   this.state.latitude,
    //   this.state.longitude
    // );
    var devicePoint = this._latLongToMerc(40.7049444, -74.0091771);

    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    if (Math.abs(objFinalPosZ) > 200 || Math.abs(objFinalPosX) > 200) {
      objFinalPosX = objFinalPosX * 0.1;
      objFinalPosZ = objFinalPosZ * 0.1;
    }

    return { x: objFinalPosX, z: -objFinalPosZ };
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allPois: state.poi.allPois,
    selectedPois: state.poi.selectedPois
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllPoisThunk: function(lat, long) {
      dispatch(getAllPoisThunk(lat, long));
    },
    toggleFullview: function(id) {
      dispatch(toggleFullview(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointOfInterest);

var styles = StyleSheet.create({
  Attractions: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#dc143c',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  Restaurants: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#8fbc8f',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  Bars: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#1e90ff',
    textAlignVertical: 'center',
    textAlign: 'center'
  },

  descriptionTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center'
  }
  // titleContainer: {
  //   backgroundColor: '#ffffffdd',
  //   padding: 0.2
  // }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointOfInterest);
