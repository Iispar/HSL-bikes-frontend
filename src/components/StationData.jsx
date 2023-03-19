import React from 'react';
import SingleStationInfo from './SingleStationInfo';
import Map from './Map';
import Header from './SingleStationHeader';

const StationData = () => (
  <div className="background">
    <div className="grid">
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
