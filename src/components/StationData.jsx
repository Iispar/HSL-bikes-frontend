import React from 'react';
import SingleStationInfo from './SingleStationInfo';
import Map from './Map';
import Header from './SingleStationHeader';

/**
 * Returns the view when the user goes in /{id}. This displays the station
 * with the id and the map. Uses a grid layout.
 */
const StationData = () => (
  <div className="background">
    <div className="grid--single">
      <div className="grid__header" id="header-container">
        <Header />
      </div>
      <div className="grid__right" id="right-container">
        <Map />
      </div>
      <div className="grid__left" id="left-container">
        <SingleStationInfo />
      </div>
    </div>
  </div>
);

export default StationData;
