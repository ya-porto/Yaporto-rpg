import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';

import {Forum, Thread} from '../pages/forum';
import {GameShop} from '../pages/gameshop';
import {Inventory} from '../pages/inventory';
import {Leaderboard} from '../pages/leaderboard';
import {Main} from '../pages/main';
import {Profile} from '../pages/profile';
import {Signin} from '../pages/signin';
import {Signup} from '../pages/signup';
import {Game} from '../pages/game';

import './App.css';
import {requireAuthentication} from './authentication';

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/gameshop" component={requireAuthentication(GameShop)}></Route>
				<Route exact path="/signin" component={Signin}></Route>
				<Route exact path="/signup" component={Signup}></Route>
				<Route exact path="/game" component={Game}></Route>
				<Route exact path="/inventory" component={requireAuthentication(Inventory)}></Route>
				<Route exact path="/forum" component={requireAuthentication(Forum)}></Route>
				<Route path="/forum/thread" component={requireAuthentication(Thread)}></Route>
				<Route path="/leaderboard" component={Leaderboard}></Route>
				<Route path="/profile" component={requireAuthentication(Profile)}></Route>
				<Route path="/home" component={Main}></Route>
				<Redirect from="/" to="/home"></Redirect>
			</Switch>
		</div>
	);
}

const Component = hot(App);

export {Component as App};
