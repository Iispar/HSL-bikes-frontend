import React from 'react';
import propTypes from 'prop-types';
import Journey from './OneJourney';

const ListJourneys = (props) => {
  const { journeys } = props;
  if (journeys.length === 0) return <div className="loading-containter"> Waiting for data... </div>;

  const list = [];
  for (let i = 0; i < journeys.length; i += 1) {
    list.push(<Journey
      key={journeys[i]._id}
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
