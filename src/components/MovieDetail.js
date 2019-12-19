import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Movie.css';

const MovieDetail = (props) => {
  const { id, title, overview, releaseDate, imageUrl, externalId, deselectMovieCallback, buttonName } = props;

  return (
    <div className="card movie-card movie-card-details">
      <section className="">
        <h5>{title}</h5>
        <p>{releaseDate}</p>
        <section>
          <button
            className="btn btn-primary"
            onClick={() => { deselectMovieCallback(externalId) }}
          >
            Close
          </button>
        </section>
      </section>
      <section className="">
        <img src={imageUrl} alt={title} className="img-rounded"></img>
        <p>Overview: {overview}</p>
      </section>
      <section className="">
        External ID: {externalId}
      </section>
    </div>
  );
};

MovieDetail.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string,
  imageUrl: PropTypes.string,
  externalId: PropTypes.number,
  selectMovieCallback: PropTypes.func
}

export default MovieDetail;