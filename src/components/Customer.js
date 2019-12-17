import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class Customer extends React.Component {
  selectCustomer = () => {
    this.props.selectCustomerCallBack(this.props.customerInfo.id);
  }

  render() {
    const { name, register_at, phone, address, city, state, postal_code, movies_checked_out_count, account_credit} = this.props.customerInfo;
    
    return (
      <section>
        <p>Customer: {name}</p>
        <p>Member since: {register_at}</p>
        <p>Phone number: {phone}</p>
        <section>
          <p>Address: </p>
          <p>{address}</p>
          <p>{city}, {state}</p>
          <p>{postal_code}</p>
        </section>
        <p>Movies checked out: {movies_checked_out_count}</p>
        <p>Available credit: {account_credit}</p>
        <button onClick={this.selectCustomer}>Select customer</button>
      </section>
    );
  }
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  register_at: PropTypes.string,
  phone: PropTypes.string,
  city: PropTypes.string,
  address: PropTypes.string,
  state: PropTypes.string,
  postal_code: PropTypes.string,
  movies_checked_out_count: PropTypes.number,
  account_credit: PropTypes.number,
  selectCustomerCallback: PropTypes.func
}

export default Customer;