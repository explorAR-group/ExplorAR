import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ViroARSceneNavigator } from "react-viro";

const InitialARScene = require("./PointOfInterest");

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
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 10,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Text style={styles.exitButtonText}>Exit AR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  exitButton: {
    alignItems: "center",
    backgroundColor: "#6e6e6e",
    padding: 10
  },
  exitButtonText: {
    color: "#ffffff"
  }
});
