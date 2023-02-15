import React from 'react';
import Journeys from './components/Journeys';
import Stations from './components/Stations';
import Header from './components/Header';
import './components/styles/main.css';
import './components/JourneysStyle.css';
import './components/StationsStyle.css';
import './components/Filters.css';
import './components/StationListStyle.css';
import './components/HeaderStyle.css';
import './components/styles/SearchBar.css';

/**
 * Basic structure for the application. Used a grid layout but only have
 * need for the header and a main element that is split into two.
 */
const App = () => (
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
  </div>
);

export default App;
