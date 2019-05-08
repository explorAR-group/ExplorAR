import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/users.js";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.handleLoginSubmitThunk(email, password);
  }

  render() {
    // console.warn(
    //   "this.props.handleLoginSubmitThunk",
    //   this.props.handleLoginSubmitThunk
    // );
    return (
      <View style={styles.loginWrapper}>
        <Text style={styles.loginHeader}>
          Expl
          <Icon name="globe-americas" size={20} color="#0000eb" />r
          <Text style={{ fontStyle: "italic" }}>AR</Text>
        </Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          placeholderTextColor="#6e6e6e"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.loginInput}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#6e6e6e"
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.loginButton}
          // onPress={() => {
          //   this.handleLoginSubmit();
          // }}
          onPress={() => {
            this.props.switchToAR();
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLoginSubmitThunk: function(email, password) {
      dispatch(auth(email, password, "login"));
    }
  };
};

export default connect(
  mapLogin,
  mapDispatchToProps
)(AuthForm);

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  loginHeader: {
    fontSize: 35,
    color: "#3d3d3d",
    textAlign: "center",
    margin: 10
  },
  loginInput: {
    fontStyle: "italic",
    color: "grey",
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