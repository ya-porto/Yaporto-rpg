import React, {Component} from 'react';
import {BackpackCard} from '../../components/backpackCard/BackpackCard';
import {ViewedClothCard} from '../../components/viewedClothCard/viewedClothCard';
import {CharacterCard} from '../../components/characterCard/characterCard';
import {ClothProps} from '../../components/clothButton/clothButton';
import {Button} from '../../components/button/index';

import './inventory.css';

interface InventoryType {
	isViewed: boolean,
	viewedItem: ClothProps
}

export class Inventory extends Component<{}, InventoryType> {
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
			<div className="inventory absolute d-flex flex-column justify-space-around pa-5" id="inventory">

				<div className="d-flex flex-row justify-center ma-2">
					<h1 className="inventory_header">Инвентарь</h1>
					<Button className="inventory_return green" children="Назад" onClick={()=>{}} />
				</div>

				<div className="d-flex flex-row justify-space-between">

					<CharacterCard />

					<BackpackCard clothes={[{
						type: 'armor',
						onClick: this.viewedItem,
						img: 'https://as1.ftcdn.net/jpg/02/16/32/46/500_F_216324673_6cXL2BrX2QI3YrLNPgnkAyC3ZbRvZZ0W.jpg'
					},
					{
						type: 'armor',
						onClick: this.viewedItem,
						img: 'https://as1.ftcdn.net/jpg/02/16/32/46/500_F_216324673_6cXL2BrX2QI3YrLNPgnkAyC3ZbRvZZ0W.jpg'

					}]} header='Рюкзак'/>

					<ViewedClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} buttonText="Надеть" />

				</div>
			</div>
		);
	}
}
