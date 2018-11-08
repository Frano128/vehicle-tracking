import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

import '../_designs';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
//"758979408479-h8rgnvkfhro2o2i3q3idek10r5cbt4u3.apps.googleusercontent.com"
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="sidenav">
                    <a href="https://www.fer.unizg.hr/rasip/dsd/projects/m2m">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="mailto:tomislav.skokovic@fer.hr">Contact</a>
                </div>
                <div className="container">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                        </div>
                    </Router>
                </div>
            </div> 
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 