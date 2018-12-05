import React, { Component } from 'react';
import Map from './Map';
import { connect } from 'react-redux';
import { clear } from '../redux/actions/index';

class Main extends Component {
  render() {
    return (
      <div>
        <div className="main_buttons">
          <button onClick={() => this.props.clear()}>Log Out</button>
        </div>
        <Map currentPosition={this.props.store.currentUser.location} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
