import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Navbar';
import LoginForm from './LoginForm';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Navbar/>
                <LoginForm/>
            </div>
        );
    }
}

export default App;
