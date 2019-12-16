import React from 'react';

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        }
    }

    render() {
        return <section><h1>Hello there!</h1></section>;
    }
}

export default CustomerList;