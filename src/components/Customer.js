import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';
import CustomerDetail from './CustomerDetail';

class Customer extends React.Component {
  selectCustomer = () => {
    this.props.selectCustomerCallback(this.props.customerInfo.id);
  }

  render() {
    const { name, registered_at, phone, address, city, state, postal_code, movies_checked_out_count, account_credit} = this.props.customerInfo;
    
    return (
      <section className='card customer-card'>
        <h4>{name}</h4>
        <p>Member since: {(new Date(registered_at)).toLocaleDateString()}</p>
        <p>Phone number: {phone}</p>
        <section>
          <p>Address: {address}</p>
          <p>{city}, {state} {postal_code}</p>
        </section>
        <p>Movies checked out: {movies_checked_out_count}</p>
        <p>Available credit: {account_credit}</p>
        <button onClick={this.selectCustomer}>Select customer</button>
        <CustomerDetail customerInfo={this.props.customerInfo} />
      </section>
    );
  }
}

Customer.propTypes = {
  customerInfo: PropTypes.object.isRequired, 
  selectCustomerCallback: PropTypes.func
}

export default Customer;