import React from 'react';
import {PureComponent, Component} from 'react';
import {Button} from '../button/index';
import {ClothItemPrpos, ClothCardProps} from './inventory.type';

// Тут лежат все спомогательные компоненты конкретно для этой страницы/модалки. Не разношу по разным файлам чтоб не мусорить проект
export class ClothItemButton extends PureComponent<ClothItemPrpos> {
	constructor(props: ClothItemPrpos) {
		super(props);
		this.state = {
			isPutOn: false,
			type: this.props.type
		};
	}

	render() {
		return (
			<button onClick={() => this.props.onClick(this.props)} style={{width: '100%', height: '100%'}}>
				<img src={this.props.img} width="100%" height="100%" alt="Мега картинка"></img>
			</button>
		);
	}
}

export class CharacterCard extends PureComponent {
	render() {
		return (
			<div className="character card mx-2 px-6 py-4 d-flex flex-column justify-space-between">
				<div className="d-flex flex-column justify-center align-center">
					<span className="character_name">Персонаж</span>
					<span className="character_icon"></span>
					<div className="d-flex flex-row justify-space-around mb-4">
						<span className="clothes_button ma-2"></span>
						<span className="clothes_button ma-2"></span>
						<span className="clothes_button ma-2"></span>
					</div>

					<div className="d-flex flex-row flex-wrap mb-4">
						<span className="character_stats_item ml-15">Уровень</span>
						<span className="character_stats_item ml-15">Жизнь</span>
						<span className="character_stats_item ml-15">Защита</span>
						<span className="character_stats_item ml-15">Урон</span>
					</div>
				</div>

				<div className="d-flex flex-row justify-space-around">
					<Button
						onClick={() => console.log('click')}
						children={'В магазин'}
						className = "green mr-5"
					/>
					<Button
						onClick={() => console.log('click')}
						children={'Играть'}
						className = "green"
					/>
				</div>
			</div>
		);
	}
}

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

export class ClothCard extends PureComponent<ClothCardProps> {
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
						onClick={() => console.log('click')}
						children={'Надеть'}
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

