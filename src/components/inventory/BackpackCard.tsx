import React from 'react';
import {Component} from 'react';
import {ClothItemPrpos} from '../components.type';
import {ClothItemButton} from '../clothItemButton/clothItemButton';

// Тут лежат все спомогательные компоненты конкретно для этой страницы/модалки. Не разношу по разным файлам чтоб не мусорить проект



export class BackpackCard extends Component<{
    clothes: ClothItemPrpos[]
}> {
	render() {
		const {clothes} = this.props;
		return (
			<div className="backpack mx-2 px-6 py-4 card d-flex flex-column align-center">
				<span className="backpack_header">Рюкзак</span>

				{clothes.map(({type, onClick, img}, i) => (
					<span className="clothes_button ma-2" key={i}>
						<ClothItemButton type={type} onClick={onClick} img={img} />
					</span>
				))}
			</div>
		);
	}
}

