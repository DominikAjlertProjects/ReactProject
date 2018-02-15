import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../actions/login';
import PropTypes from "prop-types";

class LoginForm extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            login: '',
            password: '',
            errors: {
                login: '',
                password: ''
            }
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('Submitted form:', this.state);

        this.setState({
            errors: {
                login: '',
                password: ''
            }
        });

        const result = this.props.login(this.state).then((res) => {
            // console.log("Res from server", res);
            if (res.payload.data.error) {
            if (res.payload.data.errorField === 'login') {
                this.setState({
                    errors: {
                        login: 'Użytkownik nie istnieje'
                    }
                });
            } else if (res.payload.data.errorField === 'password') {
                this.setState({
                    errors: {
                        password: 'Niepoprawne hasło'
                    }
                });
            }
        } else {
            localStorage.setItem('token', res.payload.data.token);
            this.context.router.history.push('/main');
        }
    });
    }

    render() {
        // localStorage.setItem('token', 'ksdfhdshjdsfdsdjfhds');
        // console.log("sessionStorage", sessionStorage);
        return (
            <div className="col-12 col-md-9 align-items-center">
            <form onSubmit={this.onSubmit}>
    <div className="jumbotron mt-90 card-position">
            <h1 className="display-3 text-center mb-3 ft-45">Logowanie</h1>
            <div className="form-group">
            <label htmlFor="Nazwa użytkownika" className="form-control-label">Nazwa użytkownika</label>
        <input value={this.state.login} name="login" onChange={this.onChange} type="text" className="form-control col-6"/>
            <div className="form-control-error text-danger error-text">
            {this.state.errors.login}
    </div>
        </div>
        <div className="form-group">
            <label htmlFor="Hasło" className="form-control-label">Hasło</label>
            <input value={this.state.password} name="password" onChange={this.onChange} type="password" className="form-control col-6"/>
            <div className="form-control-error text-danger error-text">
            {this.state.errors.password}
    </div>
        </div>
        <button value="Zaloguj" className="btn btn-success float-none">
            <span className="label label-success">Zaloguj się</span>
        </button>
        </div>
        </form>
        </div>
    );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);
