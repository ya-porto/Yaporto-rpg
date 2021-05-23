import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import {GameShop} from '../pages/gameshop/index';
import {Inventory} from '../pages/inventory/index';
import {Signin} from '../pages/signin/index';
import {Signup} from '../pages/signup/index';
import {Forum, Thread} from '../pages/forum/index';
import {Game} from '../pages/game/index';
import {Leaderboard} from '../pages/leaderboard/index';
import {Profile} from '../pages/profile/index';
import {Main} from '../pages/main/index';
import {requireAuthentication} from './../components/authentication';

export class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/gameshop" component={requireAuthentication(GameShop)}></Route>
					<Route exact path="/signin" component={Signin}></Route>
					<Route exact path="/signup" component={Signup}></Route>
					<Route exact path="/inventory" component={requireAuthentication(Inventory)}></Route>
					<Route exact path="/forum" component={requireAuthentication(Forum)}></Route>
					<Route path="/forum/thread" component={requireAuthentication(Thread)}></Route>
					<Route path="/game" component={requireAuthentication(Game)}></Route>
					<Route path="/leaderboard" component={Leaderboard}></Route>
					<Route path="/profile" component={Profile}></Route>
					<Route path="/home" component={Main}></Route>
					<Redirect from="/" to="/home"></Redirect>
				</Switch>
			</BrowserRouter>
		);
	}
}
