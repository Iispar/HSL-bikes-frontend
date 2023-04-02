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
    <div className="grid">
      <div className="grid__header" id="header-container">
        <Header />
      </div>
      <div className="grid__right" id="right-container">
        <Journeys />
      </div>
      <div className="grid__left" id="left-container">
        <Stations />
      </div>
      <div className="grid__footer" id="left-container">
        <div className="grid__footer__splitter">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill" />
          </svg>
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;
