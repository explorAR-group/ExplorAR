import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
export default class Splash extends Component {
  async componentDidMount() {
    setTimeout(() => {
      this.props.goToLogin();
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Expl</Text>
        <Image
          source={require("../res/globe-americas-solid.png")}
          style={{ width: 45, height: 45 }}
        />
        <Text style={styles.welcome}>r</Text>
        <Text style={[styles.welcome, { fontStyle: "italic" }]}>AR</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3232A0",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  welcome: {
    fontSize: 50,
    color: "#ffffff",
    textAlign: "center"
  }
});
