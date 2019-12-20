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
            checkedOutMovies: [],
            overdueList: [],
            customerId: undefined,
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

    componentDidMount() {}

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
                    title={movie.title}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    imageUrl={movie.image_url}
                    externalId={movie.external_id}
                    buttonName="Checkin"
                    // selectMovieCallback={this.checkin}
                    // showDetailCallback={() => { }} // we need this emty function so that browser won't crash when user click on the checked out movie list on customer detail page
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