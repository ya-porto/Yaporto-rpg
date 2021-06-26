import React from 'react';
import {PureComponent} from 'react';

import './characterCard.css';

export class CharacterCard extends PureComponent {
	render() {
		return (
			<div className="character card mx-2 px-6 py-4 d-flex flex-column justify-space-between">
				<div className="d-flex flex-column justify-center align-center">
					<span className="character_name mb-2">Персонаж</span>
					<div className="d-flex flex-row justify-space-between">
						<div className="d-flex flex-column">
							<span >Уровень</span>
							<span >Жизнь</span>
						</div>
						<div className="d-flex flex-column ml-4">
							<span >Защита</span>
							<span >Урон</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
