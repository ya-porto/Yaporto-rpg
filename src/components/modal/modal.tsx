import React from 'react';
import {IModalCompProps} from './modal.type';
import './style.css';

class Modal extends React.Component<IModalCompProps> {
	state: Readonly<IModalCompProps> = {
		...this.props
	};

	onHide(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		let target = e.target as HTMLHtmlElement;

		if (target.classList.contains('modal')) {
			// Пока не понимаю как правильно в реакте изменять пропс
			// поэтому родитель меняет свой стейт и возвращает его из функции
			this.setState({show: this.state.onHideClick()});
		}
	}

	render() {
		const {modalClassName, modalContentClassName, show} = this.state;
		const modalClassNameBuilt = `modal ${modalClassName ?? ''}`;
		const modalContentClassNameBuilt = `modal-content create-chat d-flex flex-column justify-space-between align-center pa-6 ${modalContentClassName}`;
		return (
			show ?
				<div className={modalClassNameBuilt} onClick={this.onHide.bind(this)}>
					<div className={modalContentClassNameBuilt}>
						{this.props.children}
					</div>
				</div> : null
		);
	}
}

export {Modal};
