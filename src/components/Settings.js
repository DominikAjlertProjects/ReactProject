import React, {Component} from 'react';
import {Line, Circle} from 'progressbar.js';
import { getEmail } from '../actions/getEmail';
import { updateSettings } from '../actions/updateSettings';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ToastContainer, toast} from 'react-toastify';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            currentPassword: '',
            newPassword: '',
            username: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        const email = this.props.getEmail(props.username).then((res) => {
            console.log("Res from email", res);
            if(res.payload.data.email) {
                this.setState({
                    email: res.payload.data.email,
                    username: props.username
                });
            } else {
                toast.error('Nie udało się pobrać danych');
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const form = {
            email: this.state.email,
            username: this.state.username
        }

        this.props.updateSettings(form).then((res) => {
            if(res.payload.data.status === 'OK') {
                toast.success('Twój email został zmieniony!');
            } else {
                toast.error('Wystąpił nieoczekiwany błąd, spróbuj ponownie');
            }
        });
    }

    onChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (<main className="col-sm-9 col-md-10 hidden-xs-down bg-white pt-3">
            <ToastContainer/>
            <h1 className="perfect-header">Ustawienia</h1>
            <div className="col-12 col-md-9 align-items-center">
                <form onSubmit={this.onSubmit}>
                    <div className="jumbotron card-position">
                        <div className="form-group">
                            <label htmlFor="Email" className="form-control-label">Email</label>
                            <input name="email" onChange={this.onChange} type="email" className="form-control col-6" value={this.state.email}/>
                        </div>
                        <div className="form-control-error text-danger error-text"></div>
                        {/* <div className="form-group">
                            <label htmlFor="Obecne hasło" className="form-control-label">Obecne hasło</label>
                            <input name="currentPassword" onChange={this.onChange} type="password" className="form-control col-6" value={this.state.currentPassword}/>
                        </div>
                        <div className="form-control-error text-danger error-text"></div>
                        <div className="form-group">
                            <label htmlFor="Nowe hasło" className="form-control-label">Nowe hasło</label>
                            <input name="newPassword" onChange={this.onChange} type="password" className="form-control col-6" value={this.state.newPassword}/>
                        </div>
                        <div className="form-control-error text-danger error-text"></div> */}
                        <button value="Zmień" className="btn btn-success float-none">
                            <span className="form-control-name">Zmień</span>
                        </button>
                    </div>
                </form>
                <div className="col-12 col-md-9 align-items-center" id="lineDiv"></div>
            </div>
        </main>);
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEmail,
        updateSettings
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Settings);
