import React, {PureComponent} from 'react';

export interface ClothProps {
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