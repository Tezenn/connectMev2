import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AutocompleteSetting from './placesAuto';
import { updateCurrentUser } from '../redux/actions';

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    location: '',
    coords: this.props.store.currentUser.location,
    next: false
  };

  handleGeo = obj => {
    console.log('handle geo: ', obj);
    this.setState({
      coords: [obj.coords.lat, obj.coords.lng],
      location: obj.address
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    fetch('http://localhost:3009/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert('Email Already Registered, Try Again Please.');
          return;
        } else {
          this.props.updateCurrentUser(res);
          this.setState({ next: true });
        }
      });
  };

  render() {
    if (!this.props.store.currentUser.location) {
      return <Redirect to="/" />;
    }
    if (this.state.next) {
      return <Redirect to="/topics" />;
    }
    return (
      <div>
        <div className="title">
          <h1>Register</h1>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Location:</label>
          <AutocompleteSetting
            currentPos={this.props.store.currentUser.location}
            geo={this.handleGeo}
          />
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  updateCurrentUser: data => dispatch(updateCurrentUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
