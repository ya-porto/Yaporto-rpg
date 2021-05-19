/* eslint-disable no-warning-comments */
import React from 'react';
import './style.css';

// Этот компонент пока не работает
// TODO нужно сделать компонент глобальным и управлять появлением через глобальное хранилище
class Preloader extends React.Component {
	render() {
		return (
			<div
				className="preloader-container">
				<img src="../../public/images/sword_preloader.png" alt="Загрузка" draggable="false" />
			</div>
		);
	}
}

export {Preloader};
