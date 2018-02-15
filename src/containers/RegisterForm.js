import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Navbar from '../components/Navbar';
import {requestRegister} from '../actions/requestRegister';
import RegisterSuccess from '../components/RegisterSuccess';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            email: '',
            registerCompleted: false,
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
                password: '',
                email: ''
            }
        });

        if(this.state.login.length === 0) {
            this.setState({
                errors: {
                    login: 'Nazwa użytkownika nie może być pusta'
                }
            });
            return;
        } else if(this.state.login.length <= 4) {
            this.setState({
                errors: {
                    login: 'Nazwa użytkownika nie może być krótsza niż 5 znaków'
                }
            });
            return;
        }

        if(this.state.password.length === 0) {
            this.setState({
                errors: {
                    password: 'Hasło nie może być pusta'
                }
            });
            return;
        } else if(this.state.password.length <= 4) {
            this.setState({errors: {password: 'Hasło nie może być krótsze niż 5 znaków'}});
            return;
        }

        if(this.state.email.length === 0) {
            this.setState({
                errors: {
                    email: 'Email nie może być pusty'
                }
            });
            return;
        }

        const res = this.props.requestRegister(this.state).then((res) => {
            console.log("Register form got ans!", res.payload);
        if (res.payload.status === 200 && res.payload.data.status === 'OK') {
            this.setState({registerCompleted: true});
        } else if (res.payload.status === 200 && res.payload.data.status === 'ERR') {
            if (res.payload.data.errorField === 'username') {
                this.setState({
                    errors: {
                        login: res.payload.data.error
                    }
                })
            }
        }
    });
    }

    render() {
        const {registerRequest} = this.props;

        if (this.state.registerCompleted) {
            return (
                <div className="container">
                <RegisterSuccess/>
                </div>
        );
        } else {
            return (
                <div className="container">
                <Navbar/>
                <div className="col-12 col-md-9 align-items-center">
                <form onSubmit={this.onSubmit}>
        <div className="jumbotron mt-90 card-position">
                <h1 className="display-3 text-center mb-3 ft-45">Zarejestruj się!</h1>
            <div className="form-group">
                <label htmlFor="Nazwa użytkownika" className="form-control-label">Nazwa użytkownika</label>
            <input value={this.state.login} name="login" onChange={this.onChange} type="text" className="form-control col-6"/>
                </div>
                <div className="form-control-error text-danger error-text">{this.state.errors.login}</div>
            <div className="form-group">
                <label htmlFor="Hasło" className="form-control-label">Hasło</label>
                <input value={this.state.password} name="password" onChange={this.onChange} type="password" className="form-control col-6"/>
                <div className="form-control-error text-danger error-text">{this.state.errors.password}</div>
            </div>
            <div className="form-group">
                <label htmlFor="Email" className="form-control-label">Email</label>
                <input value={this.state.email} name="email" onChange={this.onChange} type="email" className="form-control col-6"/>
                <div className="form-control-error text-danger error-text">{this.state.errors.email}</div>
            </div>
            <button value="Zaloguj" className="btn btn-success float-none">
                <span className="label label-success">Zarejestruj</span>
                </button>
                </div>
                </form>
                </div>
                </div>
        );
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestRegister: requestRegister
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);
