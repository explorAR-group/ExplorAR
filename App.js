import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store/index";
import Login from "./js/components/Login";
import Splash from "./js/components/Splash";
import AR from "./js/components/AR";

const ar = "ar";
const login = "login";
const splash = "splash";

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      screen: splash
    };

    this._enterAR = this._enterAR.bind(this);
    this._enterLogin = this._enterLogin.bind(this);
  }

  render() {
    <Provider store={store}>
      {(() => {
        switch (this.state.screen) {
          case splash:
            return <Splash enterLogin={this._enterLogin} />;
          case login:
            return <Login enterAR={this._enterAR} />;
          case ar:
            return <AR enterLogin={this._enterLogin} />;
          default:
            return <Login enterAR={this._enterAR} />;
        }
      })()}
    </Provider>;
  }

  _enterAR() {
    this.setState({
      screen: ar
    });
  }

  _enterLogin() {
    this.setState({
      screen: login
    });
  }
}
