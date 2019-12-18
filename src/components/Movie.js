import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';

const Movie = (props) => {
  const { id, title, overview, releaseDate, imageUrl, externalId, selectMovieCallback, buttonName } = props;

  return (
    <div className="card movie-card">

      <section className="">
        <section className='movie-title'>
          <h6>{title}</h6>
        </section>
        <section className='movie-select-button'>
          <button
            className="btn btn-primary"
            onClick={() => { selectMovieCallback(externalId) }}
          >
            {buttonName}
          </button>
        </section>
      </section>

      <section className="">
        <img src={imageUrl} alt={title} className="img-rounded"></img>
        {/* <p>Overview: {overview}</p> */}
      </section>

      <section className="">
        {/* External ID: {externalId} */}
      </section>

    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string,
  imageUrl: PropTypes.string,
  externalId: PropTypes.number,
  selectMovieCallback: PropTypes.func
}

export default Movie;