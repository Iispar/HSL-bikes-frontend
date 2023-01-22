import React from 'react';
import propTypes from 'prop-types';
import Station from './OneStation';

const ListStations = (props) => {
  const { stations } = props;
  if (stations.length === 0) return <div className="loading-containter"> Waiting for data... </div>;

  const list = [];
  for (let i = 0; i < stations.length; i += 1) {
    list.push(<Station
      key={stations[i].FID}
      id={stations[i].ID}
      nameFi={stations[i].Name_fi}
      nameSwe={stations[i].Name_swe}
      adressFi={stations[i].Adress_fi}
      adressSwe={stations[i].Adress}
      cityFi={stations[i].City_fi}
      citySwe={stations[i].City_swe}
      operator={stations[i].Operator}
      capasity={stations[i].Capasity}
      x={stations[i].x}
      y={stations[i].y}
    />);
  }
  return list;
};

ListStations.propTypes = {
  stations: propTypes.arrayOf(propTypes.shape([propTypes.number, propTypes.string])),
};

ListStations.defaultProps = {
  stations: null,
};

export default ListStations;
