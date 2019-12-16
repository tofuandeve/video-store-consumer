import React from 'react';
import Customer from './Customer.js';
import customerData from './customer-data.json';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    }
  }

  render() {
    const customers = customerData.map((customer, i) => {
      return (
        <section key={i}>
          <Customer customerInfo={customer}></Customer>
        </section>
      );
    })
    return <section>{customers}</section>;
  }
}

export default CustomerList;