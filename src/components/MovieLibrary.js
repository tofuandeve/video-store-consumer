import React, { Component } from 'react';
import Movie from './Movie';
import MovieDetail from './MovieDetail';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      currentMovie: undefined,
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

  showDetail = (externalId) => {
    const currentMovie = this.findMovieByExternalId(externalId)
    this.setState({ currentMovie });
  }

  deselectMovie = () => {
    this.setState({
      currentMovie: undefined,
    });
  }

  render() {
    const movie = this.state.currentMovie
    const currentMovie = (this.state.currentMovie !== undefined) ?
      (<MovieDetail
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        buttonName="Select"
        deselectMovieCallback={this.deselectMovie}
      />) : null;
  
    const movies = this.state.movieList.map((movie, i) => {
      return <Movie
        key={i}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        buttonName="Select"
        selectMovieCallback={this.selectMovie}
        showDetailCallback={this.showDetail}
      />
    })

    return (
      <div>
        <h3>{this.state.error}</h3>
        <section>{currentMovie}</section>
        <section className="movie-list">
          {movies}
        </section>
      </div>
    );
  }
}

export default MovieLibrary;