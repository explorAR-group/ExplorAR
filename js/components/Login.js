import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, logout } from "../store/users.js";
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
  handleLogout() {
    this.props.handleLogoutThunk();
    this.setState({
      email: "",
      password: ""
    });
  }
  render() {
    // console.warn(this.state);
    return (
      <View style={styles.loginWrapper}>
        <View style={styles.loginLogo}>
          <Text style={styles.loginH1}>Expl</Text>
          <Image
            source={require("../res/globe-americas-solid.png")}
            style={{ width: 30, height: 30, tintColor: "#3232A0" }}
          />
          <Text style={styles.loginH1}>r</Text>
          <Text style={[styles.loginH1, { fontStyle: "italic" }]}>AR</Text>
        </View>
        {this.props.user.id ? (
          <>
            <Text style={styles.loginH2}>
              Hello {this.props.user.firstName}!
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.props.goToAR();
              }}
            >
              <Text style={styles.loginButtonText}>Go to AR!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.handleLogout();
              }}
            >
              <Text style={styles.loginButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.loginH2}>Log in to continue</Text>
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
            {this.props.user.error && this.props.user.error.response && (
              <Text style={styles.loginError}>
                {this.props.user.error.response.data}
              </Text>
            )}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.handleLoginSubmit();
              }}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <Text style={styles.loginP}>Or create an account</Text>
          </>
        )}
      </View>
    );
  }
}
const mapLogin = state => {
  return {
    user: state.user,
    error: state.user.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleLoginSubmitThunk: function(email, password) {
      dispatch(auth(email, password, "login"));
    },
    handleLogoutThunk: function() {
      dispatch(logout());
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
  loginLogo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  loginH1: {
    fontSize: 35,
    color: "#3d3d3d",
    textAlign: "center"
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
    padding: 10,
    margin: 10
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
  },
  loginError: {
    color: "#ff0800",
    textAlign: "center",
    margin: 10
  }
});
