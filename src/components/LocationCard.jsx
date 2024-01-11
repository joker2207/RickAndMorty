import React from 'react';
import './style/App.css';

const LocationCard = ({ location }) => {
  return (
    <div className="center-container">
      <div className='info__article'>
        <h2 className='location__h2' style={{ color: 'green', textAlign: 'center' }}>
          {location?.name}
        </h2>
        <ul className='info-row' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <li>
            <span>Type:</span>
            <span>{location?.type}</span>
          </li>
          <li>
            <span>Dimension:</span>
            <span>{location?.dimension}</span>
          </li>
          <li>
            <span>Population:</span>
            <span>{location?.residents.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LocationCard;
