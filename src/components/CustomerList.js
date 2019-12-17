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
        <section key={i}>
          <Customer
            customerInfo={customer}
            selectCustomerCallBack={this.selectCustomer}
          ></Customer>
        </section>
      );
    })
    const selectedCustomer = (this.props.selectedCustomer !== undefined) ? `Selected customer: ${this.props.selectedCustomer.name}` : null;
    return (
      <section>
        <h3>{selectedCustomer}</h3>
        {customers}
      </section>);
  }
}

export default CustomerList;