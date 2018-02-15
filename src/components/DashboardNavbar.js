import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class DashboardNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable navbar-inverse bg-inverse fixed-top">
            <a className="navbar-brand ml-5">Dashboard</a>
            <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto mr-5 mt-1">
            <li className="nav-item float-left">
            <span className="float-left perfect-font">Witaj, {this.props.user}!</span>
        </li>
        </ul>

        <Link to="/" className="btn btn-outline-warning my-2 my-sm-0" onClick={() => {localStorage.removeItem('token')}}>Wyloguj</Link>
        </div>
        </nav>
    );
    }
}
