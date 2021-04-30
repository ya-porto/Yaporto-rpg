import React, {PureComponent} from 'react';
import {ClothItemPrpos} from '../components.type';

export class ClothItemButton extends PureComponent<ClothItemPrpos> {
	constructor(props: ClothItemPrpos) {
		super(props);
		this.state = {
			isPutOn: false,
			type: this.props.type
		};
    }
    
    giveOwnProps = () => {
        this.props.onClick(this.props)
    }

	render() {
		return (
			<button onClick={this.giveOwnProps} style={{width: '100%', height: '100%'}}>
				<img src={this.props.img} width="100%" height="100%" alt="Мега картинка"></img>
			</button>
		);
	}
}