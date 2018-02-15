import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable navbar-inverse bg-inverse fixed-top">
                    <a href="/" className="navbar-brand ml-5">EngineerShop</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto mr-2">
                            <li className="nav-item">
                                <a href="/register" className="nav-link">Rejestracja</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">O stronie</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Sklep</a>
                            </li>
                        </ul>
                    </div>
            </nav>
        );
    }
}
