import React, { Component } from "react";
// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage
// } from "react-native-elements";
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
// import Icon from "react-native-vector-icons/FontAwesome5";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      formName: ""
    };
  }

  componentDidMount() {
    this.setState({
      username: "Username",
      password: "Password",
      formName: "login"
    });
  }

  render() {
    return (
      <View style={styles.loginWrapper}>
        <TextInput
          style={styles.loginInput}
          placeholder={this.state.username}
          placeholderTextColor="#6e6e6e"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.loginInput}
          secureTextEntry={true}
          placeholder={this.state.password}
          placeholderTextColor="#6e6e6e"
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            console.log(
              "username: ",
              this.state.username,
              "password: ",
              this.state.password,
              "formName: ",
              this.state.formName
            );
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  loginInput: {
    fontStyle: "italic",
    marginBottom: 10,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#eeeeee",
    borderWidth: 1
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#6e6e6e",
    padding: 10
  },
  loginButtonText: {
    color: "#ffffff"
  }
});
