import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
// import { connect } from "react-redux";
// import { auth } from "../store";
// import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "username",
      password: "password"
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholer={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            console.log("LOGGED IN!");
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  loginText: {
    color: "#ffffff"
  }
});
