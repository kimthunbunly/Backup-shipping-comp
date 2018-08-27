import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Maps extends React.Component{
    state = {
        selectedPlace:"comboparcel"
    }
    render(){
        const style = {
            width: '97%',
            height: '100%'
          }
        return(
                <Map
                        google={this.props.google}
                        style={style}
                        initialCenter={{
                            lat: 40.854885,
                            lng: -88.081807
                        }}
                        zoom={15}
                        onClick={this.onMapClicked}
                        >
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>{this.state.selectedPlace}</h1>
                        </div>
                    </InfoWindow>
                </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ('') // need the API Key 
  })(Maps)