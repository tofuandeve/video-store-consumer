import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css'

const Movie = (props) => {
  const { id, title, overview, releaseDate, imageUrl, externalId, selectMovieCallback } = props;

  return (
    <div className="card">

      <section className="">
        {id} - {title} - {releaseDate}
        <button
          className="btn btn-primary"
          onClick={() => { selectMovieCallback(id) }}
        >
          Select
        </button>
      </section>

      <section className="">
        <img src={imageUrl} alt={title} class="img-rounded"></img>
        <p>Overview: {overview}</p>
      </section>

      <section className="">
        External ID: {externalId}
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