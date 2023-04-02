import React from 'react';
import $ from 'jquery';

const Header = () => {
  const screen = window.matchMedia('(max-width: 1000px)');
  /**
   * When the screen is smaller than 1000px we use this switch to swap between the journeys
   * and stations display.
   * @param {String} view
   */
  const changeView = (view) => {
    if (view === 'stations') {
      $('.grid__right').css('display', 'none');
      $('.grid__left').css('display', 'flex');
    } else {
      $('.grid__right').css('display', 'flex');
      $('.grid__left').css('display', 'none');
    }
  };
  /**
   * Checks if the screen size is larger than the small screen.
   * If true sets journeys and stations visible.
   */
  function checkScreenSize(size) {
    if (size.matches) {
      $('.grid__right').css('display', 'none');
      $('.grid__left').css('display', 'flex');
    } else {
      $('.grid__right').css('display', 'flex');
      $('.grid__left').css('display', 'flex');
    }
  }
  // sets listener for screen.
  checkScreenSize(screen);
  screen.addListener(checkScreenSize);

  return (
    <div className="header">
      <div className="header__logo"> LOGO </div>
      <div className="header__switch">
        <button className="header__switch__stations-btn" type="button" onClick={() => changeView('stations')}> stations </button>
        <button className="header__switch__jorneys-btn" type="button" onClick={() => changeView('journeys')}> journeys </button>
      </div>
      <div className="header__create-new">
        <button className="header__create-new__btn" type="button"> Create new </button>
      </div>
    </div>
  );
};

export default Header;
