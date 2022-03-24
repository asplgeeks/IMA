import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { Button, Card, CardBody } from 'reactstrap'
const mapStyles = {
  width: '95%',
  height: '85%'
}

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };

      onMarkerClick = (props, marker, e) => {
       setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
      })
      };
  
    onClose = props => {
      if (state.showingInfoWindow) {
       setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
  render() {
    return (<div>

        <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      >
        {/* <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
      </Map>
       <Button.Ripple color='primary' className='ripple-button'  size="lg" style={{float:"right", position:"absolue", bottom: 0}} >Select</Button.Ripple>

       </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDgNTb-bn5e-OKNGaHEVBr52iTjnGXFAYY"
})(MapContainer)