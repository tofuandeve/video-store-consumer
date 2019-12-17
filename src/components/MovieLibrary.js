import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';
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

  selectMovie = (movieId) => {
    const selectedMovie = this.state.movieList.find((movie) => {
      return movie.id === movieId;
    });

    this.props.selectMovieCallback(selectedMovie);
  }

  render () {
    const { selectedMovie } = this.props;

    const movies = this.state.movieList.map((movie, i) => {
      return <Movie 
        key={i}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        selectMovieCallback={this.selectMovie}
      />
    })

    return (
      <div>
        <h3>{this.state.error}</h3>
        <h3>{ selectedMovie ? `Selected movie: ${selectedMovie.title}` : null }</h3>
        <section className="movie-list">
          {movies}
        </section>
      </div>
    );
  }
}

export default MovieLibrary;