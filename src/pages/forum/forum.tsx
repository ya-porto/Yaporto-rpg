import React, {PureComponent} from 'react';
import {ThreadProps} from './thread.type';

import './forum.css';

interface ForumProps {
    threads: ThreadProps[]
}

export class Forum extends PureComponent<ForumProps> {
	render() {
		return (
			<div className="forum page d-flex flex-column py-10 px-16">
				<div className="d-flex flex-row justify-center mb-9">
					<h1>Форум</h1>
				</div>
				<div className="threads d-flex flex-column justify-start">
					{this.props.threads.map((thread: ThreadProps) => {
						return (
							<div className="thread d-flex flex-column pt-4 pb-2 px-4 mb-4" key={thread.id}>
								<span className="thread_created mb-1">Создан: {thread.data}</span>
								<span className="thread_theme mb-2">{thread.theme}</span>
								<span className="thread_message px-1 py-2 mb-2">{thread.message}</span>
								<span className="thread_comments">Коммментарии: {thread.commentsQuantity}</span>
							</div>
						);
					})}
				</div>
			</div>

		);
	}
}
