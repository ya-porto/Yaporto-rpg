import React from 'react';
import {IButtonCompProps} from './Button.type';
import './style.css';

class Button extends React.Component<IButtonCompProps> {
	render() {
		const {className, disabled, children, onClick} = this.props;
		const buttonClassName = `button ${className ?? ''}`;
		return (
			<button className={buttonClassName} onClick={onClick} disabled={disabled}>
				{children}
			</button>
		);
	}
}

export {Button};
