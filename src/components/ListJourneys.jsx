import React from 'react';
import propTypes from 'prop-types';
import Journey from './OneJourney';

/**
 * Lists all of the journeys as Journey objects.
 * @param {} props
 * @returns list that includes journey objects
 */
const ListJourneys = (props) => {
  const { journeys } = props;
  // if no results set it as the result.
  if (journeys.length === 0) return <p id="loadingJourneys-container" className="loadingJourneys-container"> No results </p>;
  const list = [];
  for (let i = 0; i < journeys.length; i += 1) {
    list.push(<Journey
      key={journeys[i]._id}
      id={journeys[i]._id}
      departureStationName={journeys[i].Departure_station_name}
      returnStationName={journeys[i].Return_station_name}
      distance={journeys[i].Covered_distance}
      duration={journeys[i].Duration}
    />);
  }
  return list;
};

ListJourneys.propTypes = {
  journeys: propTypes.arrayOf(propTypes.shape([propTypes.number, propTypes.string])),
};

ListJourneys.defaultProps = {
  journeys: null,
};

export default ListJourneys;
