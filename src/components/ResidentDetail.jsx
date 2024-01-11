// ResidentDetail.jsx
import React from 'react';

const ResidentDetail = ({ resident }) => {
  return (
    <div className="resident-detail">
      <h2>{resident.name}</h2>
      <img src={resident.image} alt={resident.name} />
      <p>Status: {resident.status}</p>
      <p>Origin: {resident.origin.name}</p>
      <p>Episodes Where Appear: {resident.episode.length}</p>
    </div>
  );
}

export default ResidentDetail;
