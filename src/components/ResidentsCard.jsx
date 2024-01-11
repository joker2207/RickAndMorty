import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import './style/ResidentsCard.css'
const ResidentsCard = ({ url }) => {
  const [resident, getResident] = useFetch(url);

  useEffect(() => {
    getResident();
  }, []);

  return (
    <article className="resident__card">
      <header className="resident__header">
        <img src={resident?.image} alt='' className="resident__img" />
        <div className="resident__status">
          <div className={`resident__status__circle ${resident?.status}`}>
          </div>
          <span className="resident__status__value">{resident?.status}</span>
        </div>
      </header>
      <section className="resident__details">
        <h3 className="resident__name">{resident?.name}</h3>
        <hr className="resident__hr" />
        <ul className="resident__list">
          <li className="resident__item"><span className="resident__label">Species:</span><span className="resident__value">{resident?.species}</span></li>
          <li className="resident__item"><span className="resident__label">Origin:</span><span className="resident__value">{resident?.origin.name}</span></li>
          <li className="resident__item"><span className="resident__label">Episodes Where Appear:</span><span className="resident__value">{resident?.episode.length}</span></li>
          <li className="resident__item"><span className="resident__label">Gender:</span><span className="resident__value">{resident?.gender}</span></li>
          <li className="resident__item"><span className="resident__label">Location:</span><span className="resident__value">{resident?.location?.name}</span></li>
        </ul>
      </section>
    </article>
  );
}

export default ResidentsCard;
