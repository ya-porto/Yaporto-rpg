import {Game} from 'pages/game';
import {Main} from 'pages/main';
import {Profile} from 'pages/profile';
import {Signup} from 'pages/signup';

import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Switch, Route} from 'react-router-dom';
import {Navigation as NavigationList} from '../constants';

import './App.css';

function App(): JSX.Element {
	return (
		<div>
			<Switch>
				<Route exact path="/home" component={Main} />
				<Route exact path={NavigationList.Game} component={Game} />
				<Route exact path={NavigationList.Signup} component={Signup} />
				<Route exact path={NavigationList.Signup} component={Signup} />
				<Route exact path={NavigationList.Profile} component={Profile} />
				<Route exact path="*" component={Main} />
			</Switch>
		</div>
	);
}

const Component = hot(App);

export {Component as App};
