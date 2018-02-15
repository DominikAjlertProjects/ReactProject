import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import Dashboard from '../containers/Dashboard';
import Settings from '../components/Settings';
import Create from '../components/Create';
// import Notes from '../components/notes';
import {connect} from 'react-redux';
// import { getNotes } from '../actions/getNotes';
import {bindActionCreators} from 'redux';
import {checkUser} from '../actions/checkUser';
import {getProjects} from '../actions/getProjects';
import {removeProject} from '../actions/removeProject';
import PropTypes from "prop-types";
import jwt from 'jsonwebtoken';

class UserPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props);
        this.update = this.update.bind(this);
        if (!localStorage.token) {
            this.state = {
                username: '',
                projects: []
            };
            this.props.history.push('/register');
            return;
        } else if (localStorage.token) {
            let decoded = {};
            try {
                 decoded = jwt.verify(localStorage.token, '');
            } catch (e) {
                if (e) {
                    this.props.history.push('/');
                }
            }
            console.log("Decoded", decoded);
            this.state = {
                username: decoded.username
            };
            const res = this.props.checkUser(decoded.username).then((res) => {
                // console.log("Res from server ->", res);
                if (res.payload.data.status !== 'OK') {
                    this.props.history.push('/');
                }
            }).catch((e) => {});

            const pro = this.props.getProjects(decoded.username)
            .then((res) => {
                console.log("Res", res);
                this.setState({
                    projects: res.payload.data.projects
                });
            });
        }
        // console.log("This.props", this.props);
        // this.props.getNotes("user");
    }

    update() {
        const pro = this.props.getProjects(this.state.username)
        .then((res) => {
            console.log("Res", res);
            this.setState({
                projects: res.payload.data.projects
            });
        });
    }

    render() {
        console.log("Render UserPage");
        console.log("This.state", this.state);
        if (!localStorage.token) {
            this.state = {
                username: '',
                projects: []
            };
            this.props.history.push('/register');
            return <div></div>;
        }
        return (
            <div className="container-fluid float-left w-100 perfect-height">
                <DashboardNavbar user={this.state.username}/>
                <div className="row perfect-row h-100pc">
                    <Sidebar/>
                    <Switch>
                    <Route exact path="/main/dashboard" render={() => <Dashboard projects={this.state.projects} username={this.state.username} removeProject={this.props.removeProject}/>}/>
                    <Route path="/main/settings" render={() => <Settings username={this.state.username} />} />
                    <Route path="/main/create" render={() => <Create username={this.state.username} update={this.update}/>}/>
                    <Redirect to="/main/dashboard"/>
                    </Switch>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projects
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkUser: checkUser,
        getProjects: getProjects,
        removeProject: removeProject
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
