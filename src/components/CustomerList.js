import React from 'react';
import Customer from './Customer.js';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        }
    }

    render() {
        const customers = this.props.customers.map((customer, i) => {
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