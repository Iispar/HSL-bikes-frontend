import React from 'react';
import propTypes from 'prop-types';

const Journey = (props) => {
  const { departureStationName } = props;
  const { returnStationName } = props;
  const { distance } = props;
  const distanceInKm = parseFloat(distance / 1000).toFixed(2);
  const { duration } = props;
  const durationInMin = Math.floor(duration / 60);
  const num = Math.floor(Math.random() * 200) + 50;
  const string = `${num}px`;

  /**
   * Returns html for one single journey.
   */
  return (
    <div name="journey-display" className="journey-display">
      <div className="journey-display__location">
        <div className="journey-display__location__from-text" name="station-text">
          {departureStationName}
        </div>
        <div className="journey-display__location__from-station" />
        <div className="journey-display__location__biker" style={{ left: string }} />
        <div className="journey-display__location__to-text">
          {returnStationName}
        </div>
        <div className="journey-display__location__to-station" />
      </div>
      <div className="journey-display__data">
        <p className="journey-display__data__text">
          {distanceInKm}
          KM
        </p>
        <p className="journey-display__data__text">
          {durationInMin}
          MIN
        </p>
      </div>
    </div>
  );
};

Journey.propTypes = {
  departureStationName: propTypes.string.isRequired,
  returnStationName: propTypes.string.isRequired,
  distance: propTypes.number.isRequired,
  duration: propTypes.number.isRequired,
};

export default Journey;
