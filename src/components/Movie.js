import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';
import MovieDetail from './MovieDetail';

const Movie = (props) => {
  const {title, overview, releaseDate, imageUrl, externalId, selectMovieCallback, buttonName } = props;
  const styling = (props.isHighlighted) ? "card movie-card overdue" : "card movie-card";
  
  return (
    <div className={styling} >

      <img src={imageUrl} alt={title} className="card-img-top"></img>
      
      <section className="card-body">
        <section className='movie-title'>
          <h5>{title}</h5>
        </section>

        <button
            className="btn btn-outline-info movie-select-button"
            onClick={() => { selectMovieCallback(externalId) }}
          >
          {buttonName}
        </button>

        <MovieDetail
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          imageUrl={imageUrl}
          externalId={externalId}
        />
      </section>

    </div>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string,
  imageUrl: PropTypes.string,
  externalId: PropTypes.number,
  selectMovieCallback: PropTypes.func
}

export default Movie;