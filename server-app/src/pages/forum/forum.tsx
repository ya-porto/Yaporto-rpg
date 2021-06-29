import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {ThreadProps} from './thread.type';
import {Menu} from '../../components/menu/menu';
// Оставляем до реализации получения сообщений с бека
import {forumMock} from '../../_mocks/forumMocks';

import './forum.css';

interface ForumProps {
	user: RootState
    threads: ThreadProps[]
}

class Forum extends Component<ForumProps> {
	state = {
		threads: forumMock
	}
	render() {
		const {threads} = this.state;
		return (
			<div className={`${this.props.user.theme} page`}>
				<Menu />
				<div className = "forum">
					<div className = "card px-16 pb-10 pt-10">
						<h1 className="pb-10">Форум</h1>
						<div className="topics d-flex flex-column justify-start scroll">
							{threads?.map((thread: ThreadProps) => {
								return (
									<div className="topic d-flex flex-column pt-4 pb-2 px-4 mb-4" key={thread.id}>
										<span className="thread_created mb-1">Создан: {thread.data}</span>
										<span className="thread_theme mb-2">{thread.theme}</span>
										<span className="thread_message px-1 py-2 mb-2">{thread.message}</span>
										<span className="thread_comments">Коммментарии: {thread.commentsQuantity}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Forum);