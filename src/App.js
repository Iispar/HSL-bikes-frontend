import React from 'react'
import Header from './components/Header'

import './components/Grid.css'

/**
 * Basic structure for the application. Used a grid layout but only have
 * need for the header and a main element that is split into two.
 */
const App = () => {
  return (
    <div className="grid-container">
      <div className="header-container">
        <Header/>
      </div>
      <div className="left-container">

      </div>
      <div className="right-container">

      </div>
    </div>
  )
}

export default App
