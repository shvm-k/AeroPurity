import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { searchCities } from "../../api";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => searchCities(inputValue);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <div className="search-container">
        <AsyncPaginate
          placeholder="Search for any city worldwide"
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
