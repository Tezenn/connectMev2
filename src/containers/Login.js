import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, clear } from '../redux/actions/index';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const encoded = window.btoa(
      this.state.username + ':' + this.state.password
    );
    fetch('http://localhost:3009/login', {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + encoded
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('Wrong Username or Password');
          this.props.clear();
        } else {
          this.props.login({
            ...res._doc,
            token: res.auth,
            authenticated: true
          });
          this.props.history.push('/main');
        }
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Log In</h1>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button>Connect Me</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  login: userInfo => dispatch(login(userInfo)),
  clear: () => dispatch(clear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
