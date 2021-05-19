import React from 'react';
import {IModalCompProps} from './modal.type';
import './style.css';

class Modal extends React.Component<IModalCompProps> {
	render() {
		const {modalClassName, modalContentClassName, show} = this.props;
		const modalClassNameBuilt = `modal ${modalClassName ?? ''}`;
		const modalContentClassNameBuilt = `modal-content create-chat d-flex flex-column justify-space-between align-center pa-6 ${modalContentClassName}`;
		return (
			show ?
				<div className={modalClassNameBuilt}>
					<div className={modalContentClassNameBuilt}>
						{this.props.children}
					</div>
				</div> : null
		);
	}
}

export {Modal};
