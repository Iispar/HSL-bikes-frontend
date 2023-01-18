/* eslint-disable react/prop-types */
import React from 'react'
import propTypes from 'prop-types'

const Dropdown = (props) => {
  for (const i in props) {
    console.log(i)
    console.log(`props.${i}`)
  }
  return (
    <button className = "dropdown-button"> Sort </button>
  //     <div className = "dropdown-container">
  //     <button className = "dropdown-button"> Sort </button>
  //     <div className = "dropdown-content">
  //         <button className = "sort-button" onClick={() => changeFilter(['sort=-Covered_distance'])}> Furthest </button>
  //         <button className = "sort-button" onClick={() => changeFilter(['sort=+Covered_distance'])}> Shortest </button>
  //         <button className = "sort-button" onClick={() => changeFilter(['sort=-Duration'])}> Longest </button>
  //         <button className = "sort-button" onClick={() => changeFilter(['sort=+Duration'])}> Fastest </button>
  //     </div>
  // </div>
  )
}

Dropdown.propTypes = {
  changeFilter: propTypes.func
}

export default Dropdown
