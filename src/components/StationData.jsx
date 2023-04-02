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
    <div className="grid-single">
      <div className="grid-single__header" id="header-container">
        <Header />
      </div>
      <div className="grid-single__right" id="right-container">
        <div className="grid-single__right__splitter">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
          </svg>
        </div>
        <Map />
      </div>
      <div className="grid-single__left" id="left-container">
        <SingleStationInfo />
      </div>
    </div>
  </div>
);

export default StationData;
