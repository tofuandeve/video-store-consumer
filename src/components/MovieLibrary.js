import React, { Component } from 'react';
import Movie from './Movie';
import axios from 'axios';

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
        movieList: response.data
      })
    }).catch(() => {
      this.setState({
        error: 'Sorry! Sth went wrong.'
      })
    })
  }

  selectMovie = (movieId) => {
    const { movieList } = this.state;

    const selectedMovie = movieList.find((movie) => {
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
        <h1>{this.state.error}</h1>
        <h1>{selectedMovie ? selectedMovie.title : ''}</h1>

        <section className="movie-list-wrapper">
          {movies}
        </section>
      </div>
    );
  }
}

export default MovieLibrary;