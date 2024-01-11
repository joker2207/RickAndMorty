import React, { useEffect, useState, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentsCard from './components/ResidentsCard';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const url = selectedLocation ? `https://rickandmortyapi.com/api/location/${selectedLocation.id}` : '';
  const [location, getLocation] = useFetch(url);

  useEffect(() => {
    if (selectedLocation && !hasError) {
      getLocation();
    }
  }, [selectedLocation, hasError]);

  const getSuggestions = async (value) => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${value}`);
    const data = await response.json();
    return data.results || [];
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const handleSuggestionSelected = (_, { suggestion }) => {
    setInputValue(suggestion.name);
    setSelectedLocation(suggestion);
    setSuggestions([]);
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setCurrentPage(1);
  };

  const quantyPage = Math.ceil((location?.residents?.length || 0) / perPage);

  return (
    <div>
      <header>
        <img src="./public/frame.jpg" alt="Rick and Morty" />
      </header>
      <form onSubmit={handleSubmit} className="center-form">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={handleSuggestionSelected}
          inputProps={{
            type: 'text',
            value: inputValue,
            onChange: (_, { newValue }) => setInputValue(newValue),
          }}
        />
        <button>Search</button>
      </form>
      {hasError ? (
        <h2>Hey! Please select a valid location from the suggestions.</h2>
      ) : (
        <>
          <LocationCard location={location} />
          <div className='resident__container'>
            {location?.residents
              ?.slice((currentPage - 1) * perPage, currentPage * perPage)
              .map(url => (
                <ResidentsCard
                  key={url}
                  url={url}
                />
              ))}
          </div>
          {quantyPage > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>Página {currentPage} de {quantyPage}</span>
              <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, quantyPage))} disabled={currentPage === quantyPage}>
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
