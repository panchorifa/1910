import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import {noop} from 'lodash.noop'
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({
  map: {
    height: '100%',
    borderRadius: '2px',
  }
})

const InitialMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      options={{mapTypeControl:false, panControl:false,
          streetViewControl:false, zoomControl: false, scaleControl: false, draggable: false,
          scrollwheel: false}}
      defaultZoom={3}
      defaultCenter={{lat: 28.632996, lng: -106.069099}}>
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={noop}
          onRightClick={noop}
          onDragStart={noop}
        />
      ))}
    </GoogleMap>
  )
})

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers: [{
        position: {
          lat: 28.632996,
          lng: -106.069099,
        },
      },{
        position: {
          lat: 32.2669444,
          lng: -99.7427778
        }
      }]
    }
  }

  render() {
    return (
      <div className={css(styles.map)}>
        <InitialMap
            containerElement={
              <div style={{height: '100%'}}/>
            }
            mapElement={
              <div style={{height: '100%'}}/>
            }
            onMapLoad={noop}
            onMapClick={noop}
            onMarkerRightClick={noop}
            markers={this.state.markers}
        />
      </div>
    )
  }
}
