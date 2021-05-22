import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { GlobalStyles, ThemeProvider } from './theme'

ReactDOM.render(
    <Router>
        <GlobalStyles/>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </Router>,
    document.getElementById('root')
);
