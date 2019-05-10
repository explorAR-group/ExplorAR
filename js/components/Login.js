import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/users.js";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

class Login extends Component {
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
    // console.warn(this.state);
    return (
      <View style={styles.loginWrapper}>
        <Text style={styles.loginH1}>
          Expl
          <Icon name="globe-americas" size={20} color="#3232A0" />r
          <Text style={{ fontStyle: "italic" }}>AR</Text>
        </Text>
        {isLoggedIn ? (
          <Text style={styles.loginP}>YAY! LOGGED IN!</Text>
        ) : (
          <>
            <Text style={styles.loginH2}>Log in to continue</Text>
            {/* <Image
          style={{ height: 50, width: 293 }}
          source={require("../res/ExplorAR-logo.png")}
        /> */}
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
                this.handleLoginSubmit();
                // this.props.goToAR();
              }}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <Text style={styles.loginP}>Or create an account</Text>
          </>
        )}
        {this.props.error && this.props.error.response && (
          <Text style={styles.loginP}> {error.response.data} </Text>
        )}
      </View>
    );
  }
}

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
    isLoggedIn: !!state.user.id
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
)(Login);

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  loginH1: {
    fontSize: 35,
    color: "#3d3d3d",
    textAlign: "center",
    margin: 30
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
  },
  loginH2: {
    fontSize: 20,
    color: "#3d3d3d",
    textAlign: "center",
    margin: 20
  },
  loginP: {
    color: "#3d3d3d",
    textAlign: "center",
    margin: 10
  }
});
