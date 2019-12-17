import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: undefined,
    }
  }

  selectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CustomerList
          selectCustomerCallBack={this.selectCustomer}
          selectedCustomer={this.state.selectedCustomer}
        >
        </CustomerList>
      </div>
    );
  }
}

export default App;
