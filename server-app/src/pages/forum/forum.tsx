import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {ThreadProps} from './thread.type';
import {Menu} from '../../components/menu/menu';
// Оставляем до реализации получения сообщений с бека
import {threadMocks} from '../../_mocks/forumMocks';

import './forum.css';
import {Button} from 'components/button';
import {Input} from 'components/input';

interface ForumProps {
	user: RootState
	threads: ThreadProps[],
	isCreateMode: boolean,
	title: string,
	text: string
}

class Forum extends Component<ForumProps> {
	state = {
		threads: threadMocks,
		isCreateMode: false,
		title: '',
		text: ''
	}

	toggleCreateMode = () => {
		this.setState({isCreateMode: !this.state.isCreateMode});
	}

	render() {
		const {threads} = this.state;
		return (
			<div className={`${this.props.user.theme} page`}>
				<Menu />
				<div className = "forum">
					<div className = "card px-16 pb-10 pt-10">
						<h1 className="pb-10">Форум</h1>
						{
							this.state.isCreateMode ?
								<form className="thread_comment_field d-flex flex-column align-center mt-6">
									<Input className="thred_input" value={this.state.title} type="text" placeholder="Ваш заголовок" />
									<Input className="thred_input" value={this.state.text} type="textarea" placeholder="Ваш текст" />
									<Button className="thread_button mt-6 py-2">Создать</Button>
									<Button className="thread_button mt-6 py-2" onClick={this.toggleCreateMode}>Отмена</Button>
								</form> :
								<>
									<div className="create__title" onClick={this.toggleCreateMode}>Создать тред</div>
									<div className="topics d-flex flex-column justify-start">
										{threads?.map((thread: ThreadProps) => {
											return (
												<div className="topic d-flex flex-column pt-4 pb-2 px-4 mb-4" key={thread.id}>
													<span className="thread_created mb-1">Создан: {thread.author.name}</span>
													<span className="thread_theme mb-2">{thread.title}</span>
													<span className="thread_message px-1 py-2 mb-2">{thread.text}</span>
													<span className="thread_comments">Коммментарии: {thread.comments?.length}</span>
												</div>
											);
										})}
									</div>
								</>
						}
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
