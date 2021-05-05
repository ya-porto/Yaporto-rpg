import React from 'react';
import './style.css';

interface IMain {
	buttons: {
		icon?: string,
		text: string,
		className?: string,
		path: string
	}[]
}
class Main extends React.Component {
	state: Readonly<IMain> = {
		// Потом в зависимости от того залогинен ли пользователь, будем рендерить нужное
		buttons: [{
			text: 'Играть',
			path: 'game',
			className: 'buttons-item mr-2'
		}, {
			text: 'Войти',
			path: 'signin',
			className: 'buttons-item mr-2'
		}, {
			text: 'Регистрация',
			path: 'signup',
			className: 'buttons-item mr-2'
		}, {
			text: 'Профиль',
			path: 'profile',
			className: 'buttons-item mr-2'
		}, {
			text: 'Форум',
			path: 'forum',
			className: 'buttons-item mr-2'
		}]
	};

	render() {
		const {buttons} = this.state;
		return (
			<div className="page page-main d-flex justify-center">
				<div className="container d-flex justify-center">
					<div className="left pa-2 d-flex flex-column">
						<ul className="buttons d-flex">
							{
								buttons.map(({text, path, className}, i) => (
									<li key={i} className={className}>
										<a href={path}>{text}</a>
									</li>
								))
							}
						</ul>
						<div className="info mt-5">
							<p>Здесь будет невероятное описание нашей фантастически крутой (нет) игры</p>
						</div>
					</div>
					<div className="right pa-2">
						<h2>Leaderboard</h2>
						Здесь будет лидербоард когда вольем его в sprint5
					</div>
				</div>
			</div>
		);
	}
}

export {Main};
