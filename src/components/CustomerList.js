import React from 'react';
import Customer from './Customer.js';
import axios from 'axios';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    }
  }

  selectCustomer = (customerId) => {
    const customer = this.state.customers.find((customer) => {
      return customer.id === customerId
    });

    this.props.selectCustomerCallBack(customer);
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

  render() {
    const customers = this.state.customers.map((customer, i) => {
      return (
        <Customer
          key={i}
          customerInfo={customer}
          selectCustomerCallBack={this.selectCustomer}
        ></Customer>
      );
    })
    const selectedCustomer = (this.props.selectedCustomer !== undefined) ? `Selected customer: ${this.props.selectedCustomer.name}` : null;
    
    return (
      <section>
        <h3>{this.state.error}</h3>
        <h3>{selectedCustomer}</h3>
        <section>
          {customers}
        </section>
      </section>);
  }
}

export default CustomerList;