import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';

export default (
    <Route path="/test" component={LoginForm} />
);
