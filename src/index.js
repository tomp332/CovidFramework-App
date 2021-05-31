import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { GlobalStyles, ThemeProvider } from './theme'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <GlobalStyles/>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);
