import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import getPosition from '../utils/getPosition';
import check from '../utils/initialCheck';
import { connect } from 'react-redux';
import { addCurrentPosition, clear, login } from '../redux/actions/index';

class Landing extends Component {
  state = {
    toRegister: false,
    toLogin: false,
    tokenFound: false
  };

  componentDidMount() {
    check.call(this);
    getPosition.call(this);
  }

  render() {
    if (this.state.toRegister) {
      return <Redirect to="/register" />;
    }
    if (this.state.toLogin) {
      return <Redirect to="/login" />;
    }
    if (this.state.tokenFound) {
      return <Redirect to="/main" />;
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

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  setLocation: position => dispatch(addCurrentPosition(position)),
  clear: () => dispatch(clear()),
  login: data => dispatch(login(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
