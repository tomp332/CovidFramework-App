import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {GlobalStyles, ThemeProvider} from './theme'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


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
