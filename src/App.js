import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import MovieLibrary from './components/MovieLibrary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: undefined,
      selectedMovie: undefined,
    }
  }

  selectCustomer = (selectedCustomer) => {
    this.setState({ selectedCustomer });
  }

  selectMovie = (selectedMovie) => {
    this.setState({ selectedMovie })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our video store!</h1>
        </header>
        <p className="App-intro"></p>
        <CustomerList
          selectCustomerCallBack={this.selectCustomer}
          selectedCustomer={this.state.selectedCustomer}
        />
        <MovieLibrary
          selectMovieCallback={this.selectMovie}
          selectedMovie={this.state.selectedMovie}
        />
      </div>
    );
  }
}

export default App;
