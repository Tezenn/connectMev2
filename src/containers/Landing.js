import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Landing extends Component {
  state = {
    toRegister: false,
    toLogin: false
  };

  render() {
    if (this.state.toRegister === true) {
      return <Redirect to="/register" />;
    }
    if (this.state.toLogin === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="title">
          <h1>Connect.Me</h1>
          <h3>Explore the map and connect with new people</h3>
        </div>
        <div className="login_buttons">
          <button onClick={() => this.setState({ toLogin: true })}>
            Log In
          </button>
          <button onClick={() => this.setState({ toRegister: true })}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Landing;
