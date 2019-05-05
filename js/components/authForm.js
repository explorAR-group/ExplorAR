import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/users.js';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Username',
      password: 'Password',
      formName: 'login'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const formName = 'login';
    const email = this.state.username;
    const password = this.state.password;
    this.props.handleSubmitThunk(email, password, formName);
  }

  render() {
    console.warn('this.props.handleSubmitThunk', this.props.handleSubmitThunk);
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
            this.handleSubmit();
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
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmitThunk: function(email, password, formName) {
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatchToProps
)(AuthForm);

export const Signup = connect(
  mapSignup,
  mapDispatchToProps
)(AuthForm);

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  loginInput: {
    fontStyle: 'italic',
    color: 'grey',
    marginBottom: 10,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#eeeeee',
    borderWidth: 1
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#6e6e6e',
    padding: 10
  },
  loginButtonText: {
    color: '#ffffff'
  }
});
