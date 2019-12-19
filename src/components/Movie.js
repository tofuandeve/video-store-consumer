import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';

const Movie = (props) => {
  const { id, title, overview, releaseDate, imageUrl, externalId, selectMovieCallback, buttonName } = props;

  return (
    <div className="card movie-card" onClick={() => {props.showDetailCallback(externalId)}}>

      <img src={imageUrl} alt={title} className="card-img-top"></img>
      
      <section className="card-body">
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