import React, { useState, useEffect, useRef } from 'react'
import bikeService from '../services/BikeService'
import ListJourneys from './ListJourneys'
import $ from 'jquery'
import 'jquery-ui-bundle'
import 'jquery-ui-bundle/jquery-ui.css'
import { getPageFilter, newFilter } from './helpers/filterHelpers'
import { stations, stationsAndIds } from '../data/stationsData'

/**
 * method for creating the list of journeys.
 * @returns the journeys
 */
const Journeys = () => {
  const [journeys, setJourneys] = useState([])
  const page = useRef(0)
  const [filterNow, setFilterNow] = useState(['limit=10'])
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  /**
   * UseEffect hook that retrieves the data when the app is loaded in.
   */
  useEffect(() => {
    bikeService.getAll()
      .then(journeysData => setJourneys(journeysData))
    $('#backwardsJourney-button').prop('disabled', true)
  }, [])

  /**
   * method for changing the filter. And setting the journeydata as instructed by the filtering.
   * @param {Array} filter
   */
  const changeFilter = (addToFilter) => {
    const filter = newFilter(filterNow, addToFilter)
    setFilterNow(filter)
    bikeService.getFiltered(filter)
      .then(filteredJourneys => setJourneys(filteredJourneys))
  }

  /**
   * method for moving forwards and backwords pages of journeydata.
   * @param {String} direction
   * @param {Integer} page
   * @returns set journeydata as filtered
   */
  const changePage = (direction, page) => {
    if (direction === 'f') page.current = page.current + 1
    else page.current = page.current - 1
    page.current === 0 ? $('#backwardsJourney-button').prop('disabled', true) : $('#backwardsJourney-button').prop('disabled', false)
    const filter = getPageFilter(direction, page.current, filterNow)
    bikeService.getFiltered(filter)
      .then(filteredJourneys => setJourneys(filteredJourneys))
  }

  /**
   * Handles the submit of the form, formats the request and sends it to changeFilter(). We use id:s to send the request.
   */
  const handleSubmitDeparture = (event) => {
    event.preventDefault()
    $('#DepartureStationsInput').autocomplete('close')
    const id = stationsAndIds[departure]
    const filterToChange = ['Departure_station_id=' + id]
    changeFilter(filterToChange)
    setDeparture('')
  }

  const handleSubmitReturn = (event) => {
    event.preventDefault()
    $('#ReturnStationInput').autocomplete('close')
    const id = stationsAndIds[arrival]
    const filterToChange = ['Return_station_id=' + id]
    changeFilter(filterToChange)
    setDeparture('')
  }

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   * Can this be done with const(?)
   */
  $(() => {
    $('#DepartureStationsInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setDeparture(ui.item.value)
      }
    })
  })

  /**
   * Because we have two different fields we need two different useStates so we need to make different autofills, for each one.
   */
  $(() => {
    $('#ReturnStationInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setArrival(ui.item.value)
      }
    })
  })

  /**
   * Resets the filters back to none and also refreshes the journey data back.
   */
  const resetFilters = () => {
    setFilterNow(['limit=10'])
    bikeService.getFiltered(['limit=10'])
      .then(filteredJourneys => setJourneys([...filteredJourneys]))
  }

  return (
    <div className = "journeys-container">
        <div className = "journeyFilters-container">
            <div className = "stationSearch-container">
                <form onSubmit={handleSubmitDeparture}>
                    <input id="DepartureStationsInput" placeholder="Departure station" onChange={() => setDeparture(event.target.value)}></input>
                </form>
            </div>
            <div className = "stationSearch-container">
            <form onSubmit={handleSubmitReturn}>
                <input id="ReturnStationInput" placeholder="Return station" onChange={() => setArrival(event.target.value)}></input>
            </form>
        <div className="resetButton-container">
            <button id="reset-button" className="reset-button" onClick={() => resetFilters()}> reset filters </button>
        </div>
        </div>

            <div className = "dropdown-container">
            <button className = "dropdown-button"> Sort </button>
            <div className = "dropdown-content">
                <button id = "DistanceDecreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=-Covered_distance'])}> Furthest </button>
                <button id = "DistanceIncreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=+Covered_distance'])}> Shortest </button>
                <button id = "DurationDecreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=-Duration'])}> Longest </button>
                <button id = "DurationIncreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=+Duration'])}> Fastest </button>
                <button id = "DateIncreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=+Departure'])}> Oldest </button>
                <button id = "DateDecreasing-button" className = "sort-button" onClick={() => changeFilter(['sort=-Departure'])}> Latest </button>
            </div>
        </div>
    </div>
      <div className = "listOfJourneys-container">
        <ListJourneys journeys = {journeys} />
      </div>

      <div className = "pagination-container">
        <button id = "backwardsJourney-button" onClick = {() => changePage('b', page)}> previous </button>
        <button id = "forwardsJourney-button" onClick = {() => changePage('f', page)}> next </button>
      </div>
    </div>
  )
}

export default Journeys
