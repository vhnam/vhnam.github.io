import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from './pages/homepage';
import MainLayout from './layouts/main';

import './assets/css/bootstrap.css';

require('bootstrap')

const AppRoute = ({component: Component, layout: Layout, ...rest}) => {
    return (
        <Route {...rest} render={ props => (
            <Layout>
                <Component {...props } />
            </Layout>
        )} />
    )
}

export default class App extends Component
{
    render() {
        return (
            <Router>
                <Switch>
                    <AppRoute exact path="/" layout={ MainLayout } component={Homepage} />
                </Switch>
            </Router>
        )
    }
}
