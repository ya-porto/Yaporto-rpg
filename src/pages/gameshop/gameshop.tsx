import React, {Component} from 'react';
import {BackpackCard} from '../../components/backpackCard/BackpackCard';
import {ViewedClothCard} from '../../components/viewedClothCard/viewedClothCard';
import {ClothProps} from '../../components/clothButton/clothButton';
import {Button} from '../../components/button/index';

import './gameshop.css';

interface GameShopType {
    isViewed: boolean,
	viewedItem: ClothProps
}

export class GameShop extends Component<{}, GameShopType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isViewed: false,
			viewedItem: {
				onClick: this.viewedItem,
			}
		};
	}

	viewedItem = (data: ClothProps): void => {
		this.setState({
			viewedItem: data,
			isViewed: true
		});
	}

	render() {
		return (
			<div className="gameshop absolute d-flex flex-column justify-space-around pa-5">

				<div className="d-flex flex-row justify-center ma-2">
					<h1 className="gameshop_header">Магазин</h1>
					<Button className="gameshop_return green" children="Назад" onClick={()=>{}} />
				</div>

				<div className="d-flex flex-row ">

					<BackpackCard clothes={[{
						type: 'armor',
						onClick: this.viewedItem,
						img: 'https://as1.ftcdn.net/jpg/02/16/32/46/500_F_216324673_6cXL2BrX2QI3YrLNPgnkAyC3ZbRvZZ0W.jpg'
					},
					{
						type: 'armor',
						onClick: this.viewedItem,
						img: 'https://as1.ftcdn.net/jpg/02/16/32/46/500_F_216324673_6cXL2BrX2QI3YrLNPgnkAyC3ZbRvZZ0W.jpg'

					}]} header=''/>

					<ViewedClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} />

				</div>
			</div>
		);
	}
}
