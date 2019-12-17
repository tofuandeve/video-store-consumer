import React from 'react';

class Customer extends React.Component {
  selectCustomer = () => {
    this.props.selectCustomerCallBack(this.props.customerInfo.id);
  }

  render() {
    return (
      <section>
        <p>Customer: {this.props.customerInfo.name}</p>
        <p>Member since: {this.props.customerInfo.register_at}</p>
        <p>Phone number: {this.props.customerInfo.phone}</p>
        <section>
          <p>Address: </p>
          <p>{this.props.customerInfo.address}</p>
          <p>{this.props.customerInfo.city}, {this.props.customerInfo.state}</p>
          <p>{this.props.customerInfo.postal_code}</p>
        </section>
        <p>Movies checked out: {this.props.customerInfo.movies_checked_out_count}</p>
        <p>Available credit: {this.props.customerInfo.account_credit}</p>
        <button onClick={this.selectCustomer}>Select customer</button>
      </section>
    );
  }
}

export default Customer;