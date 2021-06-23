import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {BackpackCard} from '../../components/backpackCard/backpackCard';
import {ViewedClothCard} from '../../components/viewedClothCard/viewedClothCard';
import {CharacterCard} from '../../components/characterCard/characterCard';
import {ClothProps} from '../../components/clothButton/clothButton';
import {Button} from '../../components/button/index';
import {Menu} from '../../components/menu/menu';

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
				onClick: this.viewedItem
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
			<div className="page">
				<Menu />
				<div className="card_wooden">

					<div className="d-flex flex-row justify-center ma-2">
						<h1 className="inventory_header">Инвентарь</h1>
					</div>

					<div className="inventory_wrapper d-flex flex-row justify-space-between">

							<div className="inventory d-flex flex-column justify-space-between">
								<CharacterCard />
								<BackpackCard clothes={[{
									type: 'armor',
									onClick: this.viewedItem,
									img: ''
								},
								{
									type: 'armor',
									onClick: this.viewedItem,
									img: ''

								}]} header="Рюкзак"/>
							</div>

							<ViewedClothCard isViewed={this.state.isViewed} viewedItem={this.state.viewedItem} buttonText="Надеть" />

						<div className="inventory_buttons d-flex flex-column justify-space-betweend">
							<NavLink className="green inventory_button" to="/gameshop">
								<Button
									onClick={() => ''}
									children={'В магазин'}
									className="green inventory_button"
								/>
							</NavLink>
							<NavLink className="green inventory_button" to="/game">
								<Button
									onClick={() => ''}
									children={'Играть'}
									className="green inventory_button"
								/>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
