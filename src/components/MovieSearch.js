import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './Movie';
import './MovieSearch.css';

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: '',
    }
  }

  getMovieDataFromAPI() {
    const url = `http://localhost:3000/movies?&query=${this.state.searchTerm}`
    axios.get(url)
      .then((response) => {
        console.log(response);

        const moviesData = response.data;
        console.log(moviesData);
        this.setState({
          movies: moviesData,
          searchTerm: '',
          error: '',
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  componentDidMount() { }

  searchMovie = (event) => {
    event.preventDefault();
    this.getMovieDataFromAPI();
  }

  addMovie = (addedMovie) => {
    const url = `http://localhost:3000/movies`
    axios.post(url, addedMovie)
      .then((response) => {
        this.setState({
          error: '',
          success: 'Success: Movie is added to library!'
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  selectMovie = (externalId) => {
    const addedMovie = this.state.movies.find((movie) => {
      return movie.external_id === externalId;
    });
    this.addMovie(addedMovie);
  }

  render() {
    const movies = this.state.movies.map((movie, i) => {
      return <Movie
        key={i}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        externalId={movie.external_id}
        buttonName="Add to library"
        selectMovieCallback={this.selectMovie}
      />
    });

    let message = null;
    if(this.state.error) {
      message = <h3 className="error"> Error: This movie is already in rental library </h3>;
    } else if(this.state.success) {
      message = <h3 className="success"> {this.state.success} </h3>;
    }

    return (
      <section className='search'>
        <div>
          <label htmlFor="MovieSearch">Search</label>
        </div>

          {message}

        <form onSubmit={this.searchMovie}>
          <input
            onChange={(event) => { this.setState({ searchTerm: event.target.value }) }}
            value={this.searchTerm}
            className="search-bar"
          />
          <input type="submit" value="Search" className="new-card-form__form-button" />
        </form>
        <section className="movie-list">{movies}</section>
      </section>
    );
  }
};

export default MovieSearch;
