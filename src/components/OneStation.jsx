/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import {
  getCountTrips, setTop, getAverageDistance,
} from './helpers/stationDataHelpers';

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

  /**
   * Clicking an station displays this.
   * We set and call all wanted data from backend and set it with jquery.
   * We also hide the list of stations first and then make visible
   * the single station view.
   */
  const setSingleStationThis = async () => {
    $('#station-information').attr('name', id);
    $('#station-filter-btn').prop('disabled', true);
    $('#stations__list').css('display', 'none');
    $('#stations__pagination').css('display', 'none');
    $('#stations__search').css('display', 'none');
    $('#stations__title').css('display', 'none');
    $('#journeys').css('display', 'none');
    $('#station-information').css('display', 'flex');
    $('#station-information__selection__container__all-btn').css('background', '#ffffff');

    if (nameFi.length > 16) $('#station-information__header__name__title').css('font-size', '30px');
    else $('#station-information__header__name__title').css('font-size', '38px');

    $('#station-information__header__name__title').text(nameFi);
    $('#station-information__header__name__location').text(`${adressFi},${cityFi}`);

    await setTop('station-information__data__top-returning__list', 'return', id, 'all');
    await setTop('station-information__data__top-departing__list', 'departure', id, 'all');
    $('.station-information__data__top-returning__title').text('top return stations all time');
    $('.station-information__data__top-departing__title').text('top departure stations all time');
    $('#station-filter-btn').prop('disabled', false);

    const tripsEndingHere = await getCountTrips('return', id, 'all');
    const tripsStartingHere = await getCountTrips('departure', id, 'all');
    const avgReturning = await getAverageDistance('return', id, 'all');
    const avgDeparting = await getAverageDistance('departure', id, 'all');
    const avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    const avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    $('#station-information__data__statistics__returning__all-avg').text(`avg: ${avgReturnignKm} KM`);
    $('#station-information__data__statistics__departing__all-avg').text(`avg: ${avgDepartingKm} KM`);
    $('#station-information__data__statistics__departing__all-trips').text(`${tripsEndingHere} trips`);
    $('#station-information__data__statistics__returning__all-trips').text(`${tripsStartingHere} trips`);
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
