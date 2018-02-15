import React, {Component} from 'react';
import { NavLink as RouterNavLink, Switch, Route } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Sidebar extends Component {
    render() {
        return (
                    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                        <ul className="nav nav-pills flex-column mt-2 br-0">
                            <li className="nav-item mt-1 br-0">
                                <NavLink tag={RouterNavLink} to="/main/dashboard" className="nav-link br-0" activeClassName="active">Przegląd</NavLink>
                            </li>
                            <li className="nav-item mt-1 br-0">
                                <NavLink tag={RouterNavLink}  to="/main/create" className="nav-link br-0" activeClassName="active">Twórz</NavLink>
                            </li>
                            <li className="nav-item mt-1 br-0">
                                <NavLink tag={RouterNavLink} to="/main/settings" className="nav-link br-0" activeClassName="active">Ustawienia</NavLink>
                            </li>
                        </ul>
                    </nav>
        );
    }
}
