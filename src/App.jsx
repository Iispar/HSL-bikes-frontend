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
 * Basic structure for the application. Used a grid layout but only have
 * need for the header and a main element that is split into two.
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
