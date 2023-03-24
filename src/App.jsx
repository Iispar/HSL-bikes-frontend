import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import StationData from './components/StationData';
import './components/styles/main.css';

/**
 * Basic structure for the application. Routes for the normal home view with all stations and
 * journeys and a route for the single station view with data for station and map.
 */
const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element=<Home /> />
      <Route exact path="/:id" element=<StationData /> />
    </Routes>
  </Router>
);

export default App;
