import React, {Component} from 'react';
import './css/App.css';
import Customers from './components/customers';
import Home from './components/home'
import {BrowserRouter, Route, Switch} from "react-router-dom"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/profile" component={Customers}/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
