import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
// import { connect } from "react-redux";
// import { auth } from "../store";
// import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.hello}>HELLO</Text>
        {/* <FormLabel>Username</FormLabel>
        <FormInput onChange={username => this.setState({ username })}>
          username
        </FormInput>
        <FormLabel>Password</FormLabel>
        <FormInput onChange={password => this.setState({ password })} />
        <View>
          <Icon
            name="search"
            size={20}
            color="#bfd774"
            onPress={() => console.log(this.state)}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hello: {
    color: "white"
  }
});
