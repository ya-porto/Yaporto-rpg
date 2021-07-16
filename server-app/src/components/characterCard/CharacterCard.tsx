import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux/types';


import './characterCard.css';
interface IGameProps extends RouteComponentProps {
	game: RootState,
	character: RootState,
	dispatch: Dispatch
}
class CharacterCard extends PureComponent<IGameProps>{
	render() {
		return (
			<div className="character card mx-2 px-6 py-4 d-flex flex-column justify-space-between">
				<div className="d-flex flex-column justify-center align-center">
					<span className="character_name mb-2">Персонаж</span>
					<div className="d-flex flex-row justify-space-between">
						<div className="d-flex flex-column">
							<span >Уровень: {this.props.game.lvl}</span>
							<span >Жизнь:  {this.props.character.startedHp}</span>
						</div>
						<div className="d-flex flex-column ml-4">
							<span >Защита:  {this.props.character.startedArmor}</span>
							<span >Урон:  {this.props.character.startedDps}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	character: state.character,
	game: state.game
});

export default connect(mapStateToProps)(CharacterCard);