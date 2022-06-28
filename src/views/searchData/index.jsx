import React, { useState } from "react";
import axios from "axios";
import Result from "../definitions";
import LoadIcon from "../../assets/spinner.gif";
import "./styles.css";

const Search = () => {

    const [searchText, setSearchText] = useState('');
    const [defnitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // handling the serch text here
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    //handling click event and get API for search data
    const handleClick = () => {
        setLoading(true);
        setDefinitions('');
        setError('');
        if (searchText !== '') {
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`)
                .then((response) => {
                    setLoading(false);
                    setDefinitions(response.data);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error && error.response.data.message);
                });
        } else {
            setLoading(false);
            setError('Please enter a valid text to search');
        }
    }

    return (
        <div className="main_div">
            <div  className="main_row">
                <input type="text" className="search_bar" placeholder="Please enter here" onChange={handleSearch} value={searchText} />
                <button className="search_button" onClick={handleClick}>Search</button>                
            </div>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading"><img src={LoadIcon} alt="Loading....."/></p>}
            {/*displaying the definitions here*/}
            {defnitions.length > 0 && <Result data={defnitions} />}
        </div>
    )
}

export default Search