import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"

const SearchBar = () => {
    return (
        <div className="search__input__div">
            <input type="search" className="search__input" placeholder="Type the service you are looking for" />
            <button className="seacrh__btn"><FaSearch /></button>
        </div>
    )
}

export default SearchBar
