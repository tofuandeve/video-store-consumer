import React from 'react';
import Customer from './Customer.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    }
  }

  componentDidMount() {
    const url = "http://localhost:3000/customers"
    axios.get(url)
      .then((response) => {
        const customerData = response.data;
        this.setState({
          customers: customerData,
          error: '',
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  findCustomer = (customerId) => {
    const customer = this.state.customers.find((customer) => {
      return customer.id === customerId
    });
    return customer
  }
  
  selectCustomer = (customerId) => {
    const customer = this.findCustomer(customerId)
    this.props.selectCustomerCallback(customer);
  }

  render() {
    const customers = this.state.customers.map((customer, i) => {
      return (
        <Customer
          key={i}
          customerInfo={customer}
          selectCustomerCallback={this.selectCustomer}
        />
      );
    })
    
    return (
      <section>
        <h3>{this.state.error}</h3>
        <section>
          {customers}
        </section>
      </section>);
  }
}

CustomerList.propTypes = {
  selectCustomerCallback: PropTypes.func
}

export default CustomerList;