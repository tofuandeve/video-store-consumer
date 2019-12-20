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
      <section className='card customer-card bg-light mb-3' >
        <h5 className='card-header'>{name}</h5>

        <div className="card-body">
          <p className="card-text">Member since: {(new Date(registered_at)).toLocaleDateString()}</p>
          <p className="card-text">Movies checked out: {movies_checked_out_count}</p>
          <p className="card-text">Available credit: ${account_credit}</p>
        </div>

        <div className="buttons">
          <button className="btn btn-outline-info customer-select-button" onClick={this.selectCustomer}>Select</button>
          <CustomerDetail customerInfo={this.props.customerInfo} />
        </div>
      </section>
    );
  }
}

Customer.propTypes = {
  customerInfo: PropTypes.object.isRequired, 
  selectCustomerCallback: PropTypes.func
}

export default Customer;