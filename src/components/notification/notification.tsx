/* eslint-disable no-warning-comments */
import React from 'react';
import {INotificationCompProps} from './notification.type';
import './style.css';

// Этот компонент пока не работает
// TODO нужно сделать компонент глобальным и управлять появлением через глобальное хранилище
class Notification extends React.Component<INotificationCompProps> {
	state: Readonly<INotificationCompProps> = {
		...this.props
	};

	render() {
		const {className, type, text} = this.state;
		const NotificationClassName = `app-notification app-notification_${type} shadow ${className ?? ''}`;
		return (
			<div className={NotificationClassName}>
				{text}
			</div>
		);
	}
}

export {Notification};
