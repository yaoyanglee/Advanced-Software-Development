import React from 'react'

import {FaSearch} from "react-icons/fa" 
import './SearchBox.css'

const SearchBox = () => {
  return (
    <div className="input-wrapper">
        <FaSearch id = "search-icon" />
        <input placeholder='Type to search...' />
    </div>
  )
}

export default SearchBox