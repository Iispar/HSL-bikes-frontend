import React from 'react';
import Journeys from './Journeys';
import Stations from './Stations';
import Header from './Header';
import Footer from './Footer';

/**
 * Returns the view for the normal home view this is called when the user
 * goes in address /.
 * This displays all the stations and journeys, uses a grid layout.
 */
const Home = () => (
  <div className="background">
    <div className="background-container">
      <div id="header-background" />
    </div>
    <div className="grid">
      <div className="grid__header" id="header-container">
        <Header />
      </div>
      <div className="grid__right" id="right-container">
        <Journeys />
        <div className="background-container">
          <div id="top-right-background" />
        </div>

      </div>
      <div className="grid__left" id="left-container">
        <Stations />
        <div className="background-container--left">
          <div id="bottom-left-background" />
        </div>
      </div>
      <div className="grid__footer" id="left-container">
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;
