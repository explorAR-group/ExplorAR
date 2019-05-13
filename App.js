import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './js/store/index';
import Login from './js/components/Login';
import Splash from './js/components/Splash';
import AR from './js/components/AR';

const ar = 'ar';
const login = 'login';
const splash = 'splash';

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      screen: splash
    };

    this._goToAR = this._goToAR.bind(this);
    this._goToLogin = this._goToLogin.bind(this);
  }

  render() {
    return (
      <Provider store={store}>
        {(() => {
          switch (this.state.screen) {
            case splash:
              return <Splash goToLogin={this._goToLogin} />;
            case login:
              return <Login goToAR={this._goToAR} />;
            case ar:
              return <AR goToLogin={this._goToLogin} />;
            default:
              return <Login goToAR={this._goToAR} />;
          }
        })()}
      </Provider>
    );
  }

  _goToAR() {
    this.setState({
      screen: ar
    });
  }

  _goToLogin() {
    this.setState({
      screen: login
    });
  }
}
