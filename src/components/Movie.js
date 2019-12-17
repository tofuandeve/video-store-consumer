import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {
  const { id, title, overview, releaseDate, imageUrl, externalId, selectMovieCallback } = props;

  return (
    <div className="card movie-card">

      <section className="movie-card--header">
        {id} - {title} - {releaseDate}
        <button
          className="btn btn-primary movie-card--select-movie-btn"
          onClick={() => { selectMovieCallback(id) }}
        >
          Select
        </button>
      </section>

      <section className="movie-card--body">
        {imageUrl}
        <p>{overview}</p>
      </section>

      <section className="movie-card--footer">
        {externalId}
      </section>

    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string,
  imageUrl: PropTypes.string,
  externalId: PropTypes.number,
  selectMovieCallback: PropTypes.func
}

export default Movie;