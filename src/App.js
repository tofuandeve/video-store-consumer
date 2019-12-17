import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/customers">Customer List</Link></li>
                <li><Link to="/movies">Rental Library</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path="/customers">
                <CustomerList
                  selectCustomerCallBack={this.selectCustomer}
                  selectedCustomer={this.state.selectedCustomer}
                />
              </Route>
              <Route path="/movies">
                <MovieLibrary
                  selectMovieCallback={this.selectMovie}
                  selectedMovie={this.state.selectedMovie}
                />
              </Route>
              <Route path="/"></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
