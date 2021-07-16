import React, {Component} from 'react';
import ViewedClothCard from '../viewedClothCard/viewedClothCard';
import {ClothProps, ClothButton} from '../clothButton/clothButton';
import {Button} from '../button/index';
import './gameshop.css';

interface GameShopState {
    isViewed: boolean,
	viewedItem: ClothProps,
	sorted: string,
}

interface GameShopProps {
	clothes: ClothProps[]
}

export class GameShop extends Component<GameShopProps, GameShopState> {
	clothes: ClothProps[]
	INITIAL_STATE: GameShopState
	constructor(props: GameShopProps) {
		super(props);

		this.INITIAL_STATE = {
			isViewed: false,
			viewedItem: {
				buff: '0',
				onClick: this.viewedItem
			},
			sorted: 'Всё'
		};

		this.state = this.INITIAL_STATE;
		this.clothes = this.props.clothes;
	}

	viewedItem = (data: ClothProps): any => {
		this.setState({
			viewedItem: data,
			isViewed: true,
		});
	}

	sortItems =(event: { target: HTMLElement; }) => {
		const key = event.target?.innerHTML;
		switch (key) {
		case ('Оружие'):
			this.clothes = this.clothes?.filter((cloth: ClothProps) => {
				return cloth.type === 'weapon';
			});
			this.setState({
				isViewed: this.INITIAL_STATE.isViewed,
				viewedItem: this.INITIAL_STATE.viewedItem,
				sorted: key
			});
			break;

		case ('Броня'):
			this.clothes = this.clothes?.filter((cloth: ClothProps) => {
				return cloth.type === 'armor';
			});
			this.setState({
				isViewed: this.INITIAL_STATE.isViewed,
				viewedItem: this.INITIAL_STATE.viewedItem,
				sorted: key
			});
			break;

		case ('Всё'):
			this.clothes = this.props.clothes;
			this.setState({
				isViewed: this.INITIAL_STATE.isViewed,
				viewedItem: this.INITIAL_STATE.viewedItem,
				sorted: key
			});
			break; // No default
		}
	}

	render() {
		return (
				<div className="card_wooden">

					<div className="d-flex flex-row justify-center ma-2">
						<h1 className="gameshop_header">Магазин</h1>
					</div>

					<div className="shop_wrapper d-flex flex-row justify-space-between">
						<div className="shop card mx-2 px-6 py-4 d-flex flex-column align-center align-self-stretch justify-space-between">
							<span className="shop_header">{this.state.sorted}</span>

							{this.clothes?.map(({type, img, buff}, i) => (
								<span className="clothes_button ma-2" key={i}>
									<ClothButton type={type} buff={buff} onClick={this.viewedItem} img={img} />
								</span>
							))}
						</div>

						<ViewedClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} buttonText="Купить" />

					</div>
					<div className="gameshop_buttons d-flex flex-column justify-space-between">
						<Button className="green gameshop_button" children={'Оружие'} onClick={this.sortItems}/>
						<Button className="green gameshop_button" children={'Броня'} onClick={this.sortItems}/>
						<Button className="green gameshop_button" children={'Всё'} onClick={this.sortItems}/>
					</div>
				</div>
		);
	}
}
