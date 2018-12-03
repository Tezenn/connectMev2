import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './containers/Landing';
import Register from './containers/Register';
import Topics from './containers/Topics';
import Main from './containers/Main';
import Login from './containers/Login';
import './App.css';

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/" />;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/topics" exact component={Topics} />
          <ProtectedRoute
            path="/main"
            isAllowed={this.props.store.currentUser.authenticated}
            exact
            component={Main}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  undefined
)(App);
