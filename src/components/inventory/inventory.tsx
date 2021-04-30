import React, {Component} from 'react';
import {BackpackCard} from './BackpackCard';
import {ClothCard} from './ClothCard';
import {CharacterCard} from './CharacterCard';
import {ClothItemPrpos, InventoryType} from '../components.type';

import './inventory.css';

class Inventory extends Component<{}, InventoryType> {
	constructor(props: any) {
		super(props);
		this.state = {
			isViewed: false,
			viewedItem: {
				type: '',
				img: '',
				onClick: () => {}
			}
		};
	}

	viewedItem = (data: ClothItemPrpos): void => {
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
					<button id="return" className="inventory_return">Назад</button>
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

					}]} />

					<ClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} />

				</div>
			</div>
		);
	}
}
export default Inventory;
