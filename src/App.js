import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Landing from './containers/Landing';
import Register from './containers/Register';
import Topics from './containers/Topics';
import Main from './containers/Main';
import Login from './containers/Login';
import getPosition from './utils/getPosition';
import check from './utils/initialCheck';
import { connect } from 'react-redux';
import { addCurrentPosition, clear, login } from './redux/actions/index';
import './App.css';

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/" />;

class App extends Component {
  state = {
    tokenFound: false
  };

  componentDidMount() {
    check.call(this);
    getPosition.call(this);
  }

  render() {
    if (this.state.tokenFound) {
      console.log(this.props);
    }
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

const mapDispatchToProps = dispatch => ({
  setLocation: position => dispatch(addCurrentPosition(position)),
  clear: () => dispatch(clear()),
  login: data => dispatch(login(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
