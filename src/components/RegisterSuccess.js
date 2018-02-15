import React, { Component } from 'react';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
export default class RegisterSuccess extends Component {

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
    }

    success() {
        toast.success('Rejestracja przebiegła pomyślnie');
    }

    render() {
        this.success();
        return(
            <div className="container">
            <Navbar />
            <ToastContainer />
            <div className="col-12 col-md-9 align-items-center">
            <form onSubmit={this.onSubmit}>
    <div className="jumbotron mt-90 card-position">
            <h1 className="display-3 text-center mb-3 ft-45">Rejestracja udana!</h1>
        <p className="text-center text-success mt-4 font-success">Przejdź na stronę główną, aby zalogować się na swoje konto</p>
        </div>
        </form>
        </div>
        </div>
    );
    }
}
