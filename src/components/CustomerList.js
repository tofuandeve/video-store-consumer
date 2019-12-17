import React from 'react';
import Customer from './Customer.js';
import axios from 'axios';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedCustomer: '',
    }
  }

  selectCustomer = (customerId) => {
    const customer = this.state.customers.find((customer) => {
      return customer.id === customerId
    });
    this.setState({
      selectedCustomer: customer,
    });
  }

  componentDidMount() {
    const url = "http://localhost:3000/customers"
    axios.get(url)
      .then((response) => {
        const customerData = response.data;
        this.setState({
          customers: customerData,
          selectedCustomer: '',
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
        <section key={i}>
          <Customer
            customerInfo={customer}
            selectCustomerCallBack={this.selectCustomer}
          ></Customer>
        </section>
      );
    })
    return <section>{customers}</section>;
  }
}

export default CustomerList;