import React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  console.log();
  return (
    <div className="map">
      <MapContainer
        style={{
          height: '500px',
          marginTop: '80px',
          marginBottom: '90px',
        }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/iispar/clf8fkan4001o01pj1w98n0la/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaWlzcGFyIiwiYSI6ImNsZjZ2ZjNtbDB6MHczd3FoemJiYjYwNDIifQ.MHK5AW08xBT6JgTuYfBJTg"
        />
        <Marker position={[25, 60]}>
          <Popup>
            A pretty CSS3 popup.
            {' '}
            <br />
            {' '}
            Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
