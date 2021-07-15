import React, {PureComponent} from 'react';
import {Button} from '../button/index';
import {ClothProps} from '../clothButton/clothButton';
import { Dispatch } from 'redux';
import {changeArmor, changeDps} from '../../redux/characterSlice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/types';


import './viewedClothCard.css';

interface ClothCardProps {
    img?: string,
    viewedItem: ClothProps
	isViewed: boolean,
	buttonText: string,
	character: RootState,
	dispatch: Dispatch,
}
class ViewedClothCard extends PureComponent<ClothCardProps> {
	addStats = () => {
		const stats = +this.props.viewedItem.baf;
		console.log(stats)
		if(this.props.viewedItem.type == 'Оружие'){
			console.log('Оружие')
			this.props.dispatch(changeDps(stats))
		}
		if(this.props.viewedItem.type == 'Броня'){
			console.log('Броня')
			this.props.dispatch(changeArmor(stats))
		}
		console.log(this.props.character)
	}
	render() {
		const {img} = this.props.viewedItem;
		const {isViewed} = this.props;
		if (isViewed) {
			return (
				<div className="clothes mx-2 px-6 py-4 card d-flex flex-column align-center justify-space-between">
					<div className="d-flex flex-column justify-space-between align-center">
						<span className="clothes_header">Название шмотки</span>
						<span style={{width: '150px', height: '150px'}}>
							<img src={img} width="100%" height="100%"></img>
						</span>

						<span className="my-7 pa-2 align-self-stretch text-center baffs">Бафы</span>

						<span className="text-center">Мега пыщ-пыщ описание шмотки</span>
					</div>
					<Button
						onClick={this.addStats}
						children={this.props.buttonText}
						className = "green"
					/>
				</div>
			);
		}

		return (
			<div className="clothes mx-2 px-6 py-4 card d-flex flex-column align-center justify-space-between"></div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	character: state.character,
});

export default connect(mapStateToProps)(ViewedClothCard);
