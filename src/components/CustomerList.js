import React from 'react';
import Customer from './Customer.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerDetail from './CustomerDetail';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      currentCustomer: undefined,
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
    this.props.selectCustomerCallBack(customer);
  }

  showDetail = (customerId) => {
    const currentCustomer = this.findCustomer(customerId)
    this.setState({ currentCustomer })
  }

  render() {
    const customer = this.state.currentCustomer;
    console.log(customer)
    const currentCustomer = (customer !== undefined) ? 
      <CustomerDetail
        customerInfo={customer}
      /> : null;
    
    const customers = this.state.customers.map((customer, i) => {
      return (
        <Customer
          key={i}
          customerInfo={customer}
          selectCustomerCallBack={this.selectCustomer}
          showDetailCallback={this.showDetail}
        ></Customer>
      );
    })
    
    return (
      <section>
        <h3>{this.state.error}</h3>
        <section>{currentCustomer}</section>
        <section>
          {customers}
        </section>
      </section>);
  }
}

export default CustomerList;