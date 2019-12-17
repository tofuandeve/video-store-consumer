import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieLibrary from './components/MovieLibrary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: undefined
    }
  }

  selectMovie = (selectedMovie) => {
    this.setState({selectedMovie})
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MovieLibrary selectMovieCallback={this.selectMovie} selectedMovie={this.state.selectedMovie} />
      </div>
    );
  }
}

export default App;
