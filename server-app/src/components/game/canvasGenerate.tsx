import React, {PureComponent} from 'react';

interface props{
    xPosition: number;
    yPosition: number;
    image: HTMLImageElement;
}

export class GameCanvas extends PureComponent<props> {
	render() {
		return (
			<canvas
				ref="canvas"
				id="canvas"
				style={{
					backgroundImage: 'url(' + this.props.image.src + ')',
					backgroundSize: 'cover'
				}}
				width={this.props.xPosition}
				height={this.props.yPosition}>
			</canvas>
		);
	}
}
