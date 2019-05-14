import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
const InitialARScene = require('./PointOfInterest');
export default class AR extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
            right: 20,
            top: 20,
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              source={require('../res/times-circle.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 10,
            right: 0,
            top: 10,
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              style={styles.image}
              source={require('../res/icons/restaurant.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 40,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            margin: 10
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              style={styles.image}
              source={require('../res/icons/restaurant.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              style={styles.image}
              source={require('../res/icons/champagne-glass.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              style={styles.image}
              source={require('../res/icons/statue-of-liberty.png')}
            />
          </TouchableOpacity>
        </View>
        <FabExample />
      </View>
    );
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
  },
  button: {
    alignItems: 'center',
    padding: 20,
    marginEnd: 10,
    justifyContent: 'space-between'
  },
  image: {
    width: 30,
    height: 30,
    tintColor: 'white'
  }
});
