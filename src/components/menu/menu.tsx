import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './menu.css';

interface IButtonLink {
	icon?: string,
	text: string,
	className?: string,
	path: string
}

interface IMenu {
	buttons: IButtonLink[],
}

export class Menu extends Component {
	state: Readonly<IMenu> = {
		// Потом в зависимости от того залогинен ли пользователь, будем рендерить нужное
		buttons: [{
			text: 'Играть',
			path: 'game',
			className: 'buttons-item mr-2'
		}, {
			text: 'Войти/Регистрация',
			path: 'signin',
			className: 'buttons-item mr-2'
		}, {
			text: 'Профиль',
			path: 'profile',
			className: 'buttons-item mr-2'
		}, {
			text: 'Форум',
			path: 'forum',
			className: 'buttons-item mr-2'
		}, {
			text: 'Домашняя',
			path: 'home',
			className: 'buttons-item mr-2'
		}, {
			text: 'Лидерборд',
			path: 'leaderboard',
			className: 'buttons-item mr-2'
		}]
	}

	render() {
		const {buttons} = this.state;
		return (
			<div className="menu absolute d-flex justify-center align-center">
				<ul className="buttons d-flex justify-space-around">
					{
						buttons.map(({text, path, className}, i) => (
							<li key={i} className={className}>
								<Link to={path}>{text}</Link>
							</li>
						))
					}
				</ul>
			</div>
		);
	}
}
