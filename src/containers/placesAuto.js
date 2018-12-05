import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import Geocode from 'react-geocode';
import { withScriptjs } from 'react-google-maps';
import { URL } from '../config';
import { API_KEY } from '../config';

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', latLng: '' };
    this.geoLoc = {};
    this.convertedAddress = '';
  }

  componentDidMount() {
    console.log(this.props.currentPos);
    Geocode.setApiKey(API_KEY);
    Geocode.enableDebug();
    Geocode.fromLatLng(
      this.props.currentPos[0].toString(),
      this.props.currentPos[1].toString()
    ).then(
      res => {
        const address = res.results[0].formatted_address;
        this.setState({ address: address });
      },
      error => console.log(error)
    );
  }

  handleChange = address => this.setState({ address: address });

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng) || latLng)
      .then(latLng => this.setState({ address: address, latLng }))
      .then(() =>
        this.props.geo({
          coords: this.state.latLng,
          address: this.state.address
        })
      )
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        debounce={2000}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const Autocomplete = withScriptjs(LocationSearchInput);

export default function AutocompleteSetting(props) {
  return (
    <Autocomplete
      googleMapURL={URL}
      loadingElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
}
