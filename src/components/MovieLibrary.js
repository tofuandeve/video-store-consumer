import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies').then((response) => {
      this.setState({
        movieList: response.data,
        error: ''
      })
    }).catch((error) => {
      this.setState({
        error: error.message
      })
    })
  }

  findMovieByExternalId = (externalId) => {
    const movie = this.state.movieList.find((movie) => {
      return (movie.external_id === externalId);
    });
    return movie
  }

  selectMovie = (externalId) => {
    const selectedMovie = this.findMovieByExternalId(externalId);
    console.log(selectedMovie);
    this.props.selectMovieCallback(selectedMovie);
  }

  render() {
    const movies = this.state.movieList.map((movie, i) => {
      return <Movie
        key={i}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        buttonName="Select"
        selectMovieCallback={this.selectMovie}
      />
    })

    return (
      <div>
        <h3>{this.state.error}</h3>
        <section className="movie-list">
          {movies}
        </section>
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  selectMovieCallback: PropTypes.func
}

export default MovieLibrary;