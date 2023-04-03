import React, { useEffect } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import {
  setTop, getAverageDistance, getMonthName, getCountTrips,
} from './helpers/stationDataHelpers';

const SingleStationData = () => {
  let tripsEndingHere = null;
  let tripsStartingHere = null;
  let avgReturning = null;
  let avgDeparting = null;
  let avgReturnignKm = null;
  let avgDepartingKm = null;
  const { id } = useParams();

  /**
   * Sets the correct information for the current displayed station.
   */
  const setData = async () => {
    $('#station-information__data__statistics__container__departing__container').css('display', 'none');
    $('#station-information__data__statistics__container__returning__container').css('display', 'none');
    $('.loader-container').css('display', 'flex');

    $('.station-information__data__top-returning__container__title').text('top return: ');
    $('.station-information__data__top-departing__container__title').text('top departure:');
    $('#station-filter-btn').prop('disabled', false);

    // calculates all the data.
    await setTop('station-information__data__top-returning__container__list', 'return', id, 'all');
    await setTop('station-information__data__top-departing__container__list', 'departure', id, 'all');
    tripsEndingHere = await getCountTrips('return', id, 'all');
    tripsStartingHere = await getCountTrips('departure', id, 'all');
    avgReturning = await getAverageDistance('return', id, 'all');
    avgDeparting = await getAverageDistance('departure', id, 'all');
    avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    // sets the data.
    $('#station-information__data__statistics__container__departing__container').css('display', 'flex');
    $('#station-information__data__statistics__container__returning__container').css('display', 'flex');
    $('.loader-container').css('display', 'none');
    $('#station-information__data__statistics__container__departing__container__all-trips').text(`${tripsEndingHere} trips`);
    $('#station-information__data__statistics__container__returning__container__all-trips').text(`${tripsStartingHere} trips`);
    $('#station-information__data__statistics__container__returning__container__all-avg').text(`${avgReturnignKm} km`);
    $('#station-information__data__statistics__container__departing__container__all-avg').text(`${avgDepartingKm} km`);
  };

  /**
   * sets the station info after stats has been loaded.
   */
  useEffect(() => {
    // Doing thisway because useEffect can't be async.
    setData();
  }, []);

  /**
   * Changes the month for all of the statistics
   * @param {Int} month
   */
  const changeMonth = async (month) => {
    $('button[name=station-filter-btn]').prop('disabled', true);
    const setMonth = getMonthName(month);

    $('#station-information__data__statistics__container__departing__container').css('display', 'none');
    $('#station-information__data__statistics__container__returning__container').css('display', 'none');
    $('.loader-container').css('display', 'flex');
    $('td[name=top-stations-title]').text('');
    $('#station-information__data__top-returning__container__list').text('');
    $('#station-information__data__top-departing__container__list').text('');

    // sends the data to the map through the div's data attribute.
    if (setMonth === 'all') {
      $('#station-information__data__month-filter__dropdown__button__info__current').text('all');
      $('#map__menu').attr('data-month', 'all');
      $('#map__menu').data('month', 'all');
    } else {
      $('#station-information__data__month-filter__dropdown__button__info__current').text(setMonth);
      $('#map__menu').attr('data-month', month);
      $('#map__menu').data('month', month);
    }

    await setTop('station-information__data__top-returning__container__list', 'return', id, month);
    await setTop('station-information__data__top-departing__container__list', 'departure', id, month);

    $('button[name=station-filter-btn]').prop('disabled', false);

    tripsEndingHere = await getCountTrips('return', id, month);
    tripsStartingHere = await getCountTrips('departure', id, month);
    avgReturning = await getAverageDistance('return', id, month);
    avgDeparting = await getAverageDistance('departure', id, month);
    avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    $('#station-information__data__statistics__container__departing__container__all-trips').text(`${tripsEndingHere} trips`);
    $('#station-information__data__statistics__container__returning__container__all-trips').text(`${tripsStartingHere} trips`);
    $('#station-information__data__statistics__container__returning__container__all-avg').text(`${avgReturnignKm} km`);
    $('#station-information__data__statistics__container__departing__container__all-avg').text(`${avgDepartingKm} km`);
    $('#station-information__data__statistics__container__departing__container').css('display', 'flex');
    $('#station-information__data__statistics__container__returning__container').css('display', 'flex');
    $('.loader-container').css('display', 'none');
  };

  /**
   * When we click outside of the monthselector and the dropdown is visible we close it.
   * And when inside we open the dropdown menu.
   *
   */
  $(document).click((e) => {
    if (e.target.id !== 'station-information__data__month-filter__dropdown__search' && $('#station-information__data__month-filter__dropdown__content').css('display') === 'flex') {
      $('#station-information__data__month-filter__dropdown__content').removeClass('animation');
      $('#station-information__data__month-filter__dropdown').removeClass('focus');
    } else if (e.target.id === 'station-information__data__month-filter__dropdown__search') {
      $('#station-information__data__month-filter__dropdown__content').addClass('animation');
      $('#station-information__data__month-filter__dropdown').addClass('focus');
    }
  });

  /**
   * When we select a month we close the dropdown.
   */
  $('#station-information__data__month-filter__dropdown__content').click(() => {
    $('#station-information__data__month-filter__dropdown__content').removeClass('animation');
    $('#station-information__data__month-filter__dropdown').removeClass('focus');
  });

  return (
    <div className="station-information__data" id="station-information__data">
      <div className="station-information__data__month-filter">
        <div className="station-information__data__month-filter__dropdown" id="station-information__data__month-filter__dropdown">
          <div className="station-information__data__month-filter__dropdown__search" id="station-information__data__month-filter__dropdown__search">
            <div className="station-information__data__month-filter__dropdown__search__info">
              <div className="station-information__data__month-filter__dropdown__search__info__title"> Month </div>
              <div className="station-information__data__month-filter__dropdown__search__info__current" id="station-information__data__month-filter__dropdown__button__info__current"> all </div>
            </div>
            <i className="station-information__data__month-filter__dropdown__search__logo" />
          </div>
          <div className="station-information__data__month-filter__dropdown__content" id="station-information__data__month-filter__dropdown__content">
            <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth('all')} type="button" name="station-filter-btn"> all </button>
            <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(5)} type="button" name="station-filter-btn" id="station-filter-may"> may </button>
            <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(6)} type="button" name="station-filter-btn" id="station-filter-june"> june </button>
            <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(7)} type="button" name="station-filter-btn" id="station-filter-july"> july </button>
          </div>
        </div>
      </div>
      <div className="station-information__data__top-returning">
        <div className="station-information__data__top-returning__container">
          <div className="station-information__data__top-returning__container__title" id="station-information__data__top-returning__container__title" name="top-stations-title">
            waiting for data...
          </div>
          <ol id="station-information__data__top-returning__container__list" className="station-information__data__top-returning__container__list"> </ol>
        </div>
      </div>
      <div className="station-information__data__top-departing">
        <div className="station-information__data__top-departing__container">
          <div className="station-information__data__top-departing__container__title" id="station-information__data__top-departing__container__title" name="top-stations-title">
            waiting for data...
          </div>
          <ol id="station-information__data__top-departing__container__list" className="station-information__data__top-departing__container__list"> </ol>
        </div>
      </div>
      <div className="station-information__data__statistics">
        <div className="station-information__data__statistics__container">
          <div className="station-information__data__statistics__container__departing" id="station-information__data__statistics__container__departing">
            <div className="station-information__data__statistics__container__departing__container" id="station-information__data__statistics__container__departing__container">
              <div className="station-information__data__statistics__container__departing__container__all">
                <div className="station-information__data__statistics__container__departing__container__all__img" />
                <div className="station-information__data__statistics__container__departing__container__all__trips" id="station-information__data__statistics__container__departing__container__all-trips" />
              </div>
              <div className="station-information__data__statistics__container__departing__container__avg">
                <div className="station-information__data__statistics__container__departing__container__avg__img" />
                <div className="station-information__data__statistics__container__departing__container__avg__avg" id="station-information__data__statistics__container__departing__container__all-avg" />
              </div>
            </div>
            <div className="loader-container">
              <div className="loader-container__loader" />
            </div>
            <div className="station-information__data__statistics__container__departing__footer"> departing </div>
          </div>
          <div className="station-information__data__statistics__container__returning">
            <div className="station-information__data__statistics__container__returning__container" id="station-information__data__statistics__container__returning__container">
              <div className="station-information__data__statistics__container__returning__container__all">
                <div className="station-information__data__statistics__container__returning__container__all__img" />
                <div className="station-information__data__statistics__container__returning__container__all__trips" id="station-information__data__statistics__container__returning__container__all-trips" />
              </div>
              <div className="station-information__data__statistics__container__returning__container__avg">
                <div className="station-information__data__statistics__container__returning__container__avg__img" />
                <div className="station-information__data__statistics__container__returning__container__avg__avg" id="station-information__data__statistics__container__returning__container__all-avg" />
              </div>
            </div>
            <div className="loader-container">
              <div className="loader-container__loader" />
            </div>
            <div className="station-information__data__statistics__container__returning__footer"> returning </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStationData;
