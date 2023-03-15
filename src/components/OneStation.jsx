/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/**
 * Creates a html object of a station.
 * @param {} props
 * @returns singular station object
 */
const Station = (props) => {
  const { id } = props;
  const { nameFi } = props;
  const { nameSwe } = props;
  const { adressFi } = props;
  const { adressSwe } = props;
  const { cityFi } = props;
  const { citySwe } = props;
  const { operator } = props;
  const { capasity } = props;
  const { x } = props;
  const { y } = props;
  const navigate = useNavigate();

  /**
   * Clicking an station displays this.
   * We set and call all wanted data from backend and set it with jquery.
   * We also hide the list of stations first and then make visible
   * the single station view.
   */
  const setSingleStationThis = async () => {
    navigate(`/${id}`);
  };

  return (
    <div className="station-display" id={id} onClick={() => setSingleStationThis()} onKeyDown={() => setSingleStationThis()} role="button" tabIndex={0}>
      <div className="station-display__id">
        {id}
      </div>
      <div className="station-display__location">
        <div className="station-display__location__name">
          {nameFi}
        </div>
        <div className="station-display__location__address">
          {adressFi}
          ,&nbsp;
          {cityFi}
        </div>
      </div>
      <div className="station-display__capasity">
        {capasity}
        <div className="station-display__bike-img" />
      </div>
    </div>
  );
};

Station.propTypes = {
  id: propTypes.number,
  nameFi: propTypes.string,
  nameSwe: propTypes.string,
  adressFi: propTypes.string,
  adressSwe: propTypes.string,
  cityFi: propTypes.string,
  citySwe: propTypes.string,
  operator: propTypes.string,
  capasity: propTypes.number,
  x: propTypes.string,
  y: propTypes.string,
};

Station.defaultProps = {
  id: null,
  nameFi: null,
  nameSwe: null,
  adressFi: null,
  adressSwe: null,
  cityFi: null,
  citySwe: null,
  operator: null,
  capasity: null,
  x: null,
  y: null,
};

export default Station;
