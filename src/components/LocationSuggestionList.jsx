// LocationSuggestionList.jsx
import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const LocationSuggestionList = ({ searchQuery, handleSuggestionClick }) => {
  const [suggestions, setSuggestions] = useState([]);
  const url = `https://rickandmortyapi.com/api/location/?name=${searchQuery}`;
  const [locations, getLocations] = useFetch(url);

  useEffect(() => {
    getLocations();
  }, [searchQuery]);

  useEffect(() => {
    setSuggestions(locations?.results || []);
  }, [locations]);

  return (
    <ul className="suggestion__list">
      {suggestions.map((location) => (
        <li key={location.id} onClick={() => handleSuggestionClick(location.name)}>
          {location.name}
        </li>
      ))}
    </ul>
  );
};

export default LocationSuggestionList;
