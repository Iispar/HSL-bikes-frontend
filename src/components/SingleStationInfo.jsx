import React from 'react';
import $ from 'jquery';
import {
  setTop, getAverageDistance, getMonthName, getCountTrips,
} from './helpers/stationDataHelpers';

/**
 * Returns html for a view with one station.
 * @returns view of a single station
 */
const Station = () => {
  /**
   * Closes the single station view and returns the list.
   */
  const closeView = () => {
    $('#stations__view').css('display', 'flex');
    $('#stations__search').css('display', 'flex');
    $('#stations__title').css('display', 'flex');
    $('#stations__list').css('display', 'flex');
    $('#stations__pagination').css('display', 'flex');
    $('#journeys').css('display', 'grid');
    $('#station-information').css('display', 'none');
    $('#station-information__data__top-returning__list').empty();
    $('#station-information__data__top-departing__list').empty();
    $('#station-information__data__statistics__returning__all-avg').text('');
    $('#station-information__data__statistics__departing__all-avg').text('');
  };

  /**
   * Changes the month for all of the statistics
   * @param {Int} month
   */
  const changeMonth = async (month) => {
    $('button[name=station-filter-btn]').prop('disabled', true);
    const setMonth = getMonthName(month);
    const id = $('#station-information').attr('name');

    $('#station-information__data__statistics__departing__all-trips').text('Waiting for data...');
    $('#station-information__data__statistics__returning__all-trips').text('Waiting for data...');
    $('#station-information__data__statistics__returning__all-avg').text('');
    $('#station-information__data__statistics__departing__all-avg').text('');
    $('td[name=top-stations-title]').text('');
    $('#station-information__data__top-returning__list').text('');
    $('#station-information__data__top-departing__list').text('');

    if (setMonth === 'all') {
      $('.station-information__data__top-returning__title').text('top return stations all time');
      $('.station-information__data__top-departing__title').text('top departure stations all time');
      $('#station-information__data__statistics').text('all time');
    } else {
      $('#station-information__data__top-returning__title').text(`top return stations in ${setMonth}`);
      $('#station-information__data__top-departing__title').text(`top departure stations in ${setMonth}`);
      $('#station-information__data__statistics').text(`in ${setMonth}`);
    }
    await setTop('station-information__data__top-returning__list', 'return', id, month);
    await setTop('station-information__data__top-departing__list', 'departure', id, month);

    $('button[name=station-filter-btn]').prop('disabled', false);

    const tripsEndingHere = await getCountTrips('return', id, month);
    const tripsStartingHere = await getCountTrips('departure', id, month);
    const avgReturning = await getAverageDistance('return', id, month);
    const avgDeparting = await getAverageDistance('departure', id, month);
    const avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    const avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);

    $('#station-information__data__statistics__departing__all-trips').text(`trips ${tripsEndingHere}`);
    $('#station-information__data__statistics__returning__all-trips').text(`trips ${tripsStartingHere}`);
    $('#station-information__data__statistics__returning__all-avg').text(`avg: ${avgReturnignKm} km`);
    $('#station-information__data__statistics__departing__all-avg').text(`avg: ${avgDepartingKm} km`);
  };

  return (
    <div className="station-information" id="station-information" name="">
      <div className="station-information__header">
        <div className="station-information__header__name">
          <div className="station-information__header__name__title" id="station-information__header__name__title">
            station name
          </div>
          <div className="station-information__header__name__location" id="station-information__header__name__location">
            streetname, city
          </div>
        </div>
        <div className="station-information__header__close">
          <button className="station-information__header__close__btn" id="station-information__header__close__btn" onClick={() => closeView()} type="button"> </button>
        </div>
      </div>
      <div className="station-information__selection">
        <div className="station-information__selection__container">
          <button type="button" name="station-filter-btn" id="station-information__selection__container__all-btn" className="station-information__selection__container__btn"> stats </button>
          <button type="button" name="station-filter-btn" id="station-information__selection__container__return-btn" className="station-information__selection__container__btn"> return </button>
          <button type="button" name="station-filter-btn" id="station-information__selection__container__departure-btn" className="station-information__selection__container__btn"> departure </button>
        </div>
      </div>
      <div className="station-information__data">
        <div className="station-information__data__month-filter">
          <div className="station-information__data__month-filter__dropdown">
            <button className="station-information__data__month-filter__dropdown__button" type="button"> month </button>
            <div className="station-information__data__month-filter__dropdown__content">
              <button onClick={() => changeMonth('all')} type="button" name="station-filter-btn"> all </button>
              <button onClick={() => changeMonth(5)} type="button" name="station-filter-btn"> may </button>
              <button onClick={() => changeMonth(6)} type="button" name="station-filter-btn"> june </button>
              <button onClick={() => changeMonth(7)} type="button" name="station-filter-btn"> july </button>
            </div>
          </div>
        </div>
        <div className="station-information__data__top-returning">
          <h2 className="station-information__data__top-returning__title" id="station-information__data__top-returning__title" name="top-stations-title">
            waiting for data...
          </h2>
          <ol id="station-information__data__top-returning__list" className="station-information__data__top-returning__list"> </ol>
        </div>
        <div className="station-information__data__top-departing">
          <h2 className="station-information__data__top-departing__title" id="station-information__data__top-departing__title" name="top-stations-title">
            waiting for data...
          </h2>
          <ol id="station-information__data__top-departing__list" className="station-information__data__top-departing__list"> </ol>
        </div>
        <div className="station-information__data__statistics">
          <h2 id="station-information__data__statistics__title"> all time </h2>
          <div className="station-information__data__statistics__departing">
            <p className="station-information__data__statistics__departing__title"> departing: </p>
            <p id="station-information__data__statistics__departing__all-trips" />
            <p id="station-information__data__statistics__departing__all-avg" />
          </div>
          <div className="station-information__data__statistics__returning">
            <p className="station-information__data__statistics__returning__title"> returning: </p>
            <p id="station-information__data__statistics__returning__all-trips" />
            <p id="station-information__data__statistics__returning__all-avg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Station;
