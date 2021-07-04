import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {ThreadProps} from '../../controllers/forum/forum.type';
import {Menu} from '../../components/menu/menu';

import './forum.css';
import {Button} from '../../components/button';
import {Input} from '../../components/input';
import {forumController} from '../../controllers/forum';
import {NavLink} from 'react-router-dom';

interface ForumProps {
	user: RootState
	threads: ThreadProps[] | null,
	isCreateMode: boolean,
	title: string,
	text: string
}

class Forum extends Component<ForumProps> {
	state = {
		threads: [],
		isCreateMode: false,
		title: '',
		text: ''
	}

	toggleCreateMode = () => {
		this.setState({isCreateMode: !this.state.isCreateMode});
	}

	createThread = (e: Event) => {
		e.preventDefault();
		console.log('im here')
		const {text, title} = this.state;
		if (title === '' || text === '') {
			return;
		}

		const {id, avatar, name} = this.props.user;
		forumController.createThread({
			author: {id, avatar, name},
			text,
			title
		})
			.then(() => {
				this.setState({
					title: '',
					text: ''
				})
			}).catch(e => {
				console.log(e);
			});
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
									<Input className="thred_input" onChange={(event)=>this.setState({title: event.target.value})} value={this.state.title} type="text" placeholder="Ваш заголовок" />
									<Input className="thred_input" onChange={(event)=>this.setState({text: event.target.value})} value={this.state.text} type="textarea" placeholder="Ваш текст" />
									<Button className="thread_button mt-6 py-2" onClick={this.createThread}>Создать</Button>
									<Button className="thread_button mt-6 py-2" onClick={this.toggleCreateMode}>Отмена</Button>
								</form> :
								<>
									<div className="create__title" onClick={this.toggleCreateMode}>Создать тред</div>
									<div className="topics d-flex flex-column justify-start">
										{threads?.map((thread: ThreadProps) => {
											return (
												<NavLink className="topic d-flex flex-column pt-4 pb-2 px-4 mb-4" to={`thread?id=${thread.id}`} key={thread.id}>
													<span className="thread_created mb-1">Создан: {thread.author.name}</span>
													<span className="thread_theme mb-2">{thread.title}</span>
													<span className="thread_message px-1 py-2 mb-2">{thread.text}</span>
													<span className="thread_comments">Коммментарии: {thread.comments?.length}</span>
												</NavLink>
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
