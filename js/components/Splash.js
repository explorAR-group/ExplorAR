import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Splash extends Component {
  async componentDidMount() {
    setTimeout(() => {
      this.props.enterLogin();
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Expl
          <Icon name="globe-americas" size={30} />r
          <Text style={{ fontStyle: "italic" }}>AR</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8090be"
  },
  welcome: {
    fontSize: 50,
    color: "#ffffff",
    textAlign: "center",
    margin: 10
  }
});
