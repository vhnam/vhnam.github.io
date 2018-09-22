import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Homepage from './pages/homepage';

export default class App extends Component
{
    render() {
        return (
            <Router>
                <Route exact path="/" component={Homepage} />
            </Router>
        )
    }
}
