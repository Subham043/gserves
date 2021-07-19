import React, { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"
import axios from "../../axios"
import { show, hide } from "../../features/loaderModalSlice"
import { showServiceModal } from "../../features/serviceModalSlice"
import { selectUser } from "../../features/userSlice"
import { useSelector, useDispatch } from "react-redux"

const SearchBar = () => {

    const user = useSelector(selectUser)

    const dispatch = useDispatch();

    const config = {
        headers: { Authorization: `Bearer ${user}` }
    };

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [subNavServices, setSubNavServices] = useState([]);


    const showServiceNotListShowHandler = () => {
        dispatch(showServiceModal())
        setShowSuggestion(false)
    }



    useEffect(() => {
        dispatch(show())
        axios.get(`/api/sub-service/view`, config)
            .then((response) => {
                setSubNavServices(response.data.result)
                dispatch(hide())
            })
            .catch((error) => {
                console.log(error)
                dispatch(hide())
            })
    }, [])


    const suggestionHandler = (e) => {
        setSearchInput(e.target.value);
        e.target.value.length === 0 ? setShowSuggestion(false) : setShowSuggestion(true);
    }

    const suggestionClickHandler = (value) => {
        setSearchInput(value)
        setShowSuggestion(false)
    }

    return (
        <div style={{ position: "relative" }}>
            <div className="search__input__div">
                <input type="search" className="search__input shadow__bottom" placeholder="Type the service you are looking for" onChange={suggestionHandler} value={searchInput} />
                <button className="seacrh__btn"><FaSearch /></button>
            </div>
            {showSuggestion ? <div className="suggestion__div_container">


                {subNavServices.map((item) => {
                    if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return (
                            <div className="suggestion__div" key={item.id} onClick={() => suggestionClickHandler(item.name)}>
                                <p>{item.name}</p>
                            </div>
                        );
                    }else{
                        return (null);
                    }

                })}

                <div onClick={showServiceNotListShowHandler} className="suggestion__div" style={{ background: "#eee", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", }}>
                    <p>My service not listed</p>
                </div>


            </div> : null}
           

            
        </div>

    )
}

export default SearchBar
