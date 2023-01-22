import React from 'react';
import Header from './components/Header';
import Journeys from './components/Journeys';
import Stations from './components/Stations';
import './components/Grid.css';
import './components/JourneysStyle.css';
import './components/StationsStyle.css';

/**
 * Basic structure for the application. Used a grid layout but only have
 * need for the header and a main element that is split into two.
 */
const App = () => (
  <div className="grid-container">
    <div className="header-container">
      <Header />
    </div>
    <div className="left-container">
      <Journeys />
    </div>
    <div className="right-container">
      <Stations />
    </div>
  </div>
);

export default App;
