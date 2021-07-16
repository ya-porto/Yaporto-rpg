import React from 'react';
import {Component} from 'react';
import {ClothButton, ClothProps} from '../clothButton/clothButton';

import './backpack.css';
interface BackpackCardProps {
	clothes: ClothProps[],
	header: string
}

export class BackpackCard extends Component<BackpackCardProps> {
	render() {
		const {clothes} = this.props;
		return (
			<div className="backpack mx-2 px-6 py-4 card d-flex flex-column align-center">
				<span className="backpack_header mb-2">{this.props.header}</span>

				{clothes.map(({type, onClick, img, buff}, i) => (
					<ClothButton className="clothes_button ma-2" type={type} buff={buff} onClick={onClick} img={img} key={i}/>
				))}
			</div>
		);
	}
}

