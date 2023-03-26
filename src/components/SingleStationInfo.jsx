import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useParams, useNavigate } from 'react-router-dom';
import { stationsAndIds } from '../data/stationsData';
import {
  getKeyByValue,
} from './helpers/stationDataHelpers';
import SingleStationReturn from './SingleStationReturn';
import SingleStationDeparture from './SingleStationDeparture';
import SingleStationData from './SingleStationData';

/**
 * Returns html for a view with one station.
 * @returns view of a single station
 */
const Station = () => {
  const [currentView, setCurrentView] = useState('data');
  const { id } = useParams();
  const navigate = useNavigate();
  const name = getKeyByValue(stationsAndIds, id);

  /**
   * sets the station info after the page has been loaded.
   */
  useEffect(() => {
    $('#station-information').attr('name', id);
    $('#station-filter-btn').prop('disabled', true);
    // selects the "stats" button when page is loaded.
    $('#station-information__selection__container__data-btn').addClass('selected');

    // Formats the size of the title for station depending on the size of the name
    if (name.length > 20) $('#station-information__header__name__title').css('font-size', '22px');
    else if (name.length > 16) $('#station-information__header__name__title').css('font-size', '30px');
    else $('#station-information__header__name__title').css('font-size', '38px');

    $('#station-information__header__name__title').text(name);
  }, []);

  /**
   * Closes the single station view and returns the list to empty.
   */
  const closeView = () => {
    $('#station-information__data__top-returning__container__list').empty();
    $('#station-information__data__top-departing__container__list').empty();
    $('#station-information__data__statistics__returning__all-avg').text('');
    $('#station-information__data__statistics__container__departing__container__all-avg').text('');
    navigate('/');
  };

  /**
   * Changes the view between stats, returning trips and departing trips.
   */
  const changeView = (selection) => {
    // removes the selected view from current and moves it to new one.
    $(`#station-information__selection__container__${currentView}-btn`).removeClass('selected');
    $(`#station-information__selection__container__${selection}-btn`).addClass('selected');
    setCurrentView(selection);

    // all selections to none and then selected into grid.
    $('#map__menu__btn-container').css('display', 'none');
    $('#station-information__data').css('display', 'none');
    $('#station-information__return').css('display', 'none');
    $('#station-information__departure').css('display', 'none');
    $(`#station-information__${selection}`).css('display', 'grid');
    if (selection === 'data') {
      $('#map__menu__btn-container').css('display', 'flex');
    }
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
          <button type="button" onClick={() => changeView('data')} name="station-filter-btn" id="station-information__selection__container__data-btn" className="station-information__selection__container__btn"> stats </button>
          <button type="button" onClick={() => changeView('return')} name="station-filter-btn" id="station-information__selection__container__return-btn" className="station-information__selection__container__btn"> return </button>
          <button type="button" onClick={() => changeView('departure')} name="station-filter-btn" id="station-information__selection__container__departure-btn" className="station-information__selection__container__btn"> departure </button>
        </div>
      </div>
      <SingleStationData />
      <div className="station-information__return" id="station-information__return">
        <SingleStationReturn />
      </div>
      <div className="station-information__departure" id="station-information__departure">
        <SingleStationDeparture />
      </div>
    </div>
  );
};
export default Station;
