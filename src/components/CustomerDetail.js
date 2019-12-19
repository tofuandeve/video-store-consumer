import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';
import axios from 'axios';
import Movie from './Movie';

class CustomerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedOutMovies: [],
            overdueList: [],
            customerId: undefined
        }
    }

    getCustomerDetailFromApi = () => {
        const url = `http://localhost:3000/customers/${this.props.customerInfo.id}`;
        axios.get(url).then((response) => {
            this.setState({
                customerId: this.props.customerInfo.id,
                checkedOutMovies: response.data,
            })
        }).catch((error) => {
            this.setState({
                error: error.message,
            });
        });
    }

    componentDidMount() {
        this.getCustomerDetailFromApi()
    }

    componentDidUpdate() {
        if (this.props.customerInfo.id !== this.state.customerId) {
            this.getCustomerDetailFromApi()
        }
    }

    // checkin = (externalMovieId) => {
    //     const movie = this.state.checkedOutMovies.find((movie) => {
    //         return movie.external_id === externalMovieId;
    //     })

    //     const url = `http://localhost:3000/rentals/${movie.title}/return`
    //     axios.post(url).then((reponse) => {
    //         this.setState({
    //             error: '',
    //         });
    //     }).catch((error) => {
    //         this.setState({
    //             error: error.message,
    //         });
    //     });
    // }

    render() {
        const { name, registered_at, phone, address, city, state, postal_code, account_credit } = this.props.customerInfo;
        const movies = this.state.checkedOutMovies.map((movie, i) => {
            return (
                <Movie
                    key={i}
                    id={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    imageUrl={movie.image_url}
                    externalId={movie.external_id}
                    buttonName="Checkin"
                    // selectMovieCallback={this.checkin}
                    showDetailCallback={() => { }} // we need this emty function so that browser won't crash when user click on the checked out movie list on customer detail page
                />
            )
        })

        return (
            <section className='card customer-card customer-card-details'>
                <h4>{name}</h4>
                <p>Member since: {(new Date(registered_at)).toLocaleDateString()}</p>
                <p>Phone number: {phone}</p>
                <section>
                    <p>Address: {address}</p>
                    <p>{city}, {state} {postal_code}</p>
                </section>

                <p>Available credit: {account_credit}</p>
                <button onClick={() => { this.props.selectCustomerCallBack(this.state.customerId) }}>Select customer</button>

                <p>Movies checked out:</p>
                <section>{movies}</section>
            </section>
        );
    }

};

CustomerDetail.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string,
    imageUrl: PropTypes.string,
    externalId: PropTypes.number,
    selectMovieCallback: PropTypes.func
}

export default CustomerDetail;