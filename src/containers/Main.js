import React, { Component } from 'react';
import Map from './Map';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <div>
        main
        <Map currentPosition={this.props.store.currentUser.location} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

export default connect(
  mapStateToProps,
  undefined
)(Main);
