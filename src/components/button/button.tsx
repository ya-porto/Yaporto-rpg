import React from 'react';
import {IButtonCompProps} from './Button.type';
import './style.css';

class Button extends React.Component<IButtonCompProps> {
	state: Readonly<IButtonCompProps> = {
		...this.props
	};

	render() {
		const {className, disabled, onClick} = this.state;
		const buttonClassName = `button ${className ?? ''}`;
		return (
			<button className={buttonClassName} onClick={onClick} disabled={disabled}>
				{this.props.children}
			</button>
		);
	}
}

export {Button};
