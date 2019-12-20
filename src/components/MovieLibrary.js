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
      movieList: [],
      page: 1,
      currentPage: 1,
      nextPageBtn: true,
      previousPageBtn: true
    };
  }

  componentDidMount() {
    const params = {
      p: this.state.page,
      n: 8
    }
    axios.get(`http://localhost:3000/movies?p=${params['p']}&n=${params['n']}`).then((response) => {
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

  componentDidUpdate() {
    if(this.state.currentPage !== this.state.page){
      const params = {
        p: this.state.page,
        n: 8
      }
      axios.get(`http://localhost:3000/movies?p=${params['p']}&n=${params['n']}`).then((response) => {
        this.setState({
          movieList: response.data,
          error: '',
          currentPage: this.state.page
        })
      }).catch((error) => {
        this.setState({
          error: error.message
        })
      })
    }
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

  goPreviousPage = () => {
    if(this.state.page > 0){
      this.setState({
        page: this.state.page - 1
      })
    } else {
      this.setState({
        previousPageBtn: false
      })
    }
  }

  goNextPage = () => {
    if(this.state.movieList.length === 8){
      this.setState({
        page: this.state.page + 1
      })
    } else {
      this.setState({
        nextPageBtn: false
      })
    }
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
        <section className='movie-page'>
          <button className="btn btn-outline-info movie-page-button" onClick={this.goPreviousPage} disabled={!this.state.previousPageBtn}>Back</button>
          <span>{this.state.currentPage}</span>
          <button className="btn btn-outline-info movie-page-button" onClick={this.goNextPage} disabled={!this.state.nextPageBtn}>Next</button>
        </section>
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  selectMovieCallback: PropTypes.func
}

export default MovieLibrary;