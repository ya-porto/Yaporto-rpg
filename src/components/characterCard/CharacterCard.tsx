import React from 'react';
import {PureComponent} from 'react';
import {Button} from '../button/index';

import './characterCard.css';

export class CharacterCard extends PureComponent {
	render() {
		return (
			<div className="character card mx-2 px-6 py-4 d-flex flex-column justify-space-between">
				<div className="d-flex flex-column justify-center align-center">
					<span className="character_name">Персонаж</span>
					<span className="character_icon"></span>
					<div className="d-flex flex-row justify-space-around mb-4">
						<span className="clothes_button ma-2"></span>
						<span className="clothes_button ma-2"></span>
						<span className="clothes_button ma-2"></span>
					</div>

					<div className="d-flex flex-row flex-wrap mb-4">
						<span className="character_stats_item ml-15">Уровень</span>
						<span className="character_stats_item ml-15">Жизнь</span>
						<span className="character_stats_item ml-15">Защита</span>
						<span className="character_stats_item ml-15">Урон</span>
					</div>
				</div>
			</div>
		);
	}
}
