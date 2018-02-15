import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import Favicon from 'react-favicon';

import RegisterForm from './containers/RegisterForm';
import App from './components/App';
import UserPage from './containers/UserPage';

import "./App.css";
import routes from './routes';

let store = createStore(reducers);
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter routes={routes}>
    <div>
    <Favicon url="https://png.icons8.com/?id=54567&size=280" />
    <Switch>
    <Route path="/register" component={RegisterForm} />
<Route path="/main" component={UserPage} />
<Route path="/" component={App} />
</Switch>
</div>
</BrowserRouter>
</Provider>, document.getElementById('root'));

// registerServiceWorker();
