import React from 'react';

const Customer = (props) => {
    return (
       <section>
           <p>Customer: {props.customerInfo.name}</p>
           <p>Member since: {props.customerInfo.register_at}</p>
           <p>Phone number: {props.customerInfo.phone}</p>
           <section>
               <p>Address: </p>
               <p>{props.customerInfo.address}</p>
               <p>{props.customerInfo.city}, {props.customerInfo.state}</p>
               <p>{props.customerInfo.postal_code}</p>
           </section>
           <p>Movies checked out: {props.customerInfo.movies_checked_out_count}</p>
           <p>Available credit: {props.customerInfo.account_credit}</p>
       </section> 
    );
}

export default Customer;