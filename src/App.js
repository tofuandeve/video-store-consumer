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
import MovieSearch from './components/MovieSearch';
import axios from 'axios';

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

  componentDidMount() { }

  checkout = () => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    console.log(this.state.selectedCustomer)
    console.log(this.state.selectedMovie)
    const url = `http://localhost:3000/rentals/${this.state.selectedMovie.title}/check-out`
    const params = {
      customer_id: this.state.selectedCustomer.id,
      due_date: date,
    };
    axios.post(url, params)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
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
                <li><Link to="/search">Search Movie</Link></li>
                {(this.state.selectedCustomer !== undefined && this.state.selectedMovie !== undefined) ? <li><button onClick={this.checkout}>Checkout</button></li> : null}
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
              <Route path="/search">
                <MovieSearch />
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
