import React from 'react';
import {IModalCompProps} from './modal.type';
import './style.css';

class Modal extends React.Component<IModalCompProps> {
	render() {
		const {modalClassName, modalContentClassName, show, onClick} = this.props;
		const modalClassNameBuilt = `modal ${modalClassName ?? ''}`;
		const modalContentClassNameBuilt = `modal-content d-flex flex-column justify-space-between align-center pa-6 ${modalContentClassName}`;
		return (
			show ?
				<div onClick={onClick} className={modalClassNameBuilt}>
					<div onClick={(e) => e.stopPropagation()} className={modalContentClassNameBuilt}>
						{this.props.children}
					</div>
				</div> : null
		);
	}
}

export {Modal};
