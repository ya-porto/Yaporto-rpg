import React, {PureComponent} from 'react';

import './clothButton.css';

export interface ClothProps {
	className?: string;
    defence?: number;
    hitpoint?: number;
    img?: string;
    type?: string;
    name?: string;
    baf?: string;
    description?: string;
    isBought?: boolean;
    isPutOn?: boolean;
    onClick: (data: ClothProps) => void;
}

export class ClothButton extends PureComponent<ClothProps> {
	constructor(props: ClothProps) {
		super(props);
		this.state = {
			isPutOn: false,
			type: this.props.type
		};
	}

	giveOwnProps = () => {
		this.props.onClick(this.props);
	}

	render() {
		return (
			<button className={this.props.className} onClick={this.giveOwnProps}>
				<img src={this.props.img} width="100%" height="100%" alt="Мега картинка"></img>
			</button>
		);
	}
}
