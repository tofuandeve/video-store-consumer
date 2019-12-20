import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Movie from './Movie';

class CustomerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rentals: [],
            customerId: undefined,
            totalRental: undefined,
            show: false
        }
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }
    
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    
    getCustomerDetailFromApi = () => {
        const rentalsUrl = `http://localhost:3000/customers/${this.props.customerInfo.id}`;
        axios.get(rentalsUrl).then((response) => {
            this.setState({
                customerId: this.props.customerInfo.id,
                totalRental: this.props.customerInfo.movies_checked_out_count,
                rentals: response.data,
            })
        }).catch((error) => {
            this.setState({
                error: error.message,
            });
        });
    }

    componentDidMount() {}

    componentDidUpdate() {
        if (this.state.rentals.length !== this.state.totalRental || this.props.customerInfo.id !== this.state.customerId) {
            this.getCustomerDetailFromApi()
        }
    }

    checkin = (externalMovieId) => {
        const rental = this.state.rentals.find((rental) => {
            return rental.movie.external_id === externalMovieId;
        })
        console.log(rental)

        const url = `http://localhost:3000/rentals/${rental.movie.title}/return`
        const params = {customer_id: this.props.customerInfo.id}
        axios.post(url, params).then((reponse) => {
            this.setState({
                error: '',
                totalRental: this.state.totalRental - 1,
            });
        }).catch((error) => {
            this.setState({
                error: error.message,
            });
        });
    }

    render() {
        const { name, registered_at, phone, address, city, state, postal_code, account_credit } = this.props.customerInfo;

        const movies = this.state.rentals.map((rental, i) => {
            const isHighlighted = new Date(rental.due_date) < new Date
            return (
                <Movie
                    key={i}
                    title={rental.movie.title}
                    overview={rental.movie.overview}
                    releaseDate={rental.movie.release_date}
                    imageUrl={rental.movie.image_url}
                    externalId={rental.movie.external_id}
                    buttonName="Checkin"
                    isHighlighted={isHighlighted}
                    selectMovieCallback={this.checkin}
                />
            )
        })

        return (
            <>
                <Button variant="outline-info" onClick={this.handleShow}>
                    Details
                </Button>
            
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Member since: {(new Date(registered_at)).toLocaleDateString()}</p>
                        <p>Address: {address}</p>
                        <p>{city}, {state} {postal_code}</p>
                        <p>Phone: {phone}</p>
                        <p>Available Credit: {account_credit}</p>
                        {movies}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
};

CustomerDetail.propTypes = {
    customerInfo: PropTypes.object.isRequired
}

export default CustomerDetail;