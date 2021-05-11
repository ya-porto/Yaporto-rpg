import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {GameShop} from '../pages/gameshop/index';
import {Inventory} from '../pages/inventory/index';
import {Signin} from '../pages/signin/index';
import {Signup} from '../pages/signup/index';

export class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/gameshop" component={GameShop}></Route>
                    <Route exact path="/signin" component={Signin}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <Route exact path="/inventory" component={Inventory}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}