import React from 'react';
import propTypes from 'prop-types';
import { stationsAndIds } from '../data/stationsData';
import { getKeyByValue } from './helpers/stationDataHelpers';
/**
  * Returns html for one single journey.
  */
const Journey = (props) => {
  const { departureStationId } = props;
  const departureStationName = getKeyByValue(stationsAndIds, departureStationId);
  const { returnStationId } = props;
  const returnStationName = getKeyByValue(stationsAndIds, returnStationId);
  const { distance } = props;
  const distanceInKm = parseFloat(distance / 1000).toFixed(2);
  const { duration } = props;
  const durationInMin = Math.floor(duration / 60);
  const { id } = props;
  let string = '';
  if (!localStorage.getItem(id)) {
    const num = Math.floor(Math.random() * 200) + 50;
    string = `${num}px`;
    localStorage.setItem(id, string);
  } else {
    string = localStorage.getItem(id);
  }

  return (
    <div name="journey-display" className="journey-display">
      <div className="journey-display__location">
        <div className="journey-display__location__from-text" name="station-text">
          {departureStationName}
        </div>
        <div className="journey-display__location__arrow" />
        <div className="journey-display__location__to-text">
          {returnStationName}
        </div>
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
  departureStationId: propTypes.string.isRequired,
  returnStationId: propTypes.string.isRequired,
  distance: propTypes.number.isRequired,
  duration: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};

export default Journey;
