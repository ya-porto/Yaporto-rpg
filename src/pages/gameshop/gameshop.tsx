import React, {Component} from 'react';
import {ViewedClothCard} from '../../components/viewedClothCard/viewedClothCard';
import {ClothProps, ClothButton} from '../../components/clothButton/clothButton';
import {Button} from '../../components/button/index';
import {Menu} from '../../components/menu/menu';

import './gameshop.css';

interface GameShopState {
    isViewed: boolean,
	viewedItem: ClothProps,
	sorted: string
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
				onClick: this.viewedItem
			},
			sorted: 'Весь шмот'
		};

		this.state = this.INITIAL_STATE;
		this.clothes = this.props.clothes;
	}

	viewedItem = (data: ClothProps): void => {
		this.setState({
			viewedItem: data,
			isViewed: true
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

			case ('Весь шмот'):
				this.clothes = this.props.clothes;
				this.setState({
					isViewed: this.INITIAL_STATE.isViewed,
					viewedItem: this.INITIAL_STATE.viewedItem,
					sorted: key
				});
				break;
		}
	}

	render() {
		return (
			<div className="page">
				<Menu />
				<div className="gameshop absolute d-flex flex-column justify-space-around pa-5">

					<div className="d-flex flex-row justify-center ma-2">
						<h1 className="gameshop_header">Магазин</h1>
					</div>

					<div className="d-flex flex-row ">
						<div className="shop mx-2 px-6 py-4 card d-flex flex-column align-center align-self-stretch justify-space-between">
							<span className="shop_header">{this.state.sorted}</span>

							{this.clothes?.map(({type, img}, i) => (
								<span className="clothes_button ma-2" key={i}>
									<ClothButton type={type} onClick={this.viewedItem} img={img} />
								</span>
							))}
							<div className="d-flex flex-row justify-between align-self-stretch">
								<Button className="green mx-2" children={'Оружие'} onClick={this.sortItems}/>
								<Button className="green mx-2" children={'Броня'} onClick={this.sortItems}/>
								<Button className="green mx-2" children={'Весь шмот'} onClick={this.sortItems}/>
							</div>
						</div>

						<ViewedClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} buttonText="Купить" />

					</div>
				</div>
			</div>
		);
	}
}
