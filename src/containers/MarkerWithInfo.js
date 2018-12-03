import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class MarkerWithInfo extends Component {
  render() {
    const { user, isOpen, onSelect, onClose } = this.props;
    return (
      <Marker
        position={{
          lat: user.location.coordinates[1],
          lng: user.location.coordinates[0]
        }}
        onClick={onSelect}
      >
        {isOpen && (
          <InfoWindow onCloseClick={onClose}>
            <div>
              <h2>{user.username}</h2>
              {user.topics.map(el => (
                <div key={user._id + Math.random()}>
                  <h4>-{el}</h4>
                </div>
              ))}
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default MarkerWithInfo;
