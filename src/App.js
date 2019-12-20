import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
        this.setState({
          selectedCustomer: undefined,
          selectedMovie: undefined,
          error: '',
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    const { selectedMovie, selectedCustomer } = this.state;
    const movie = (selectedMovie !== undefined) ? (<div>Selected Movie: {selectedMovie.title}</div>) : null;
    const customer = (selectedCustomer !== undefined) ? (<div>Selected Customer: {selectedCustomer.name}</div>) : null;

    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/customers">Customer List</Link></li>
                <li><Link to="/movies">Rental Library</Link></li>
                <li><Link to="/search">Search Movie</Link></li>
                {(selectedCustomer !== undefined && selectedMovie !== undefined) ? <li><button onClick={this.checkout}>Checkout</button></li> : null}
              </ul>
            </nav>

            {movie}
            {customer}

            <Switch>
              <Route path="/customers">
                <CustomerList
                  selectCustomerCallback={this.selectCustomer}
                />
              </Route>
              <Route path="/movies">
                <MovieLibrary
                  selectMovieCallback={this.selectMovie}
                />
              </Route>
              <Route path="/search">
                <MovieSearch />
              </Route>
              <Route path="/">
                <div className='homepage'>
                  <img src="https://www.femalefirst.co.uk/image-library/land/1000/t/the-croods-poster---resize.jpg" alt="the croods" className='homepage-img'/>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
        <footer className="footer">Copyright: Eve and Xinran @2019</footer>
      </div>
    );
  }
}

export default App;
