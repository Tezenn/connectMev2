import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { API_KEY } from '../config';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateCurrentUser } from '../redux/actions';

class Register extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    location: '',
    coords: '',
    next: false
  };

  componentDidMount() {
    Geocode.setApiKey(API_KEY);
    Geocode.enableDebug();
    Geocode.fromLatLng(
      this.props.store.currentUser.location[0].toString(),
      this.props.store.currentUser.location[1].toString()
    ).then(
      res => {
        const address = res.results[0].formatted_address;
        this.setState({
          location: address,
          coords: this.props.store.currentUser.location
        });
      },
      error => console.log(error)
    );
  }

  handleGeo = obj => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        location: obj
      }
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
          <input
            type="text"
            name="location"
            placeholder="Where do you live?"
            value={this.state.location}
            onChange={this.handleChange}
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
