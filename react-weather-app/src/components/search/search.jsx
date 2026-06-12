import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import "./search.css"; // Import CSS file for styling

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [showMessage, setShowMessage] = useState(true); // Initially show message

  const loadOptions = (inputValue) => {
    setShowMessage(false); // Hide message when loading options
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&countryCode=IN&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setShowMessage(response.data.length === 0); // Show message if no options found
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };
  
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setShowMessage(false); // Hide message when city is searched
    onSearchChange(searchData);
  };

  return (
    <div>
      {showMessage && ( // Conditionally render the message container
        <div className="message-container">
          To see specific day prediction and historical plots of AQI, visit{" "}
          <a href="https://streamweather-epic142.streamlit.app/" target="_blank" rel="noopener noreferrer">
            this site
          </a>.
        </div>
      )}
      <div className="search-container"> {/* Container with rounded edges */}
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
    </div>
  );
};

export default Search;
