import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {RootState} from '../../redux/types';
import {getWindow} from 'ssr-window';

import {ThreadProps} from '../../controllers/forum/forum.type';
import {Menu} from '../../components/menu/menu';
import {Button} from '../../components/button';
import {Input} from '../../components/input';
import {forumController} from '../../controllers/forum';
import {ForumContext} from '../../utils/forumContext';
import {isServer} from '../../utils/isServerEnvChecker';
import {Navigation} from '../../client/constants';

import './forum.css';

const window = getWindow()

interface ForumProps {
	user?: RootState
}

interface IForum {
	threads: ThreadProps[] | null,
	isCreateMode: boolean,
	title: string,
	text: string
}

class Threads extends Component<ForumProps, IForum> {
	state = {
		isCreateMode: false,
		title: '',
		text: '',
		threads: isServer ? this.context.threads : JSON.parse(localStorage.forum).threads
	}

	async getAllThreads() {
		forumController.getAllThreads()
			.then(res => {
				const forum = JSON.parse(localStorage.forum)
				forum.threads = res
				localStorage.setItem('forum',JSON.stringify(forum))
				
			})
	}

	toggleCreateMode = () => {
		this.setState({isCreateMode: !this.state.isCreateMode});
	}

	createThread = (e: Event) => {
		e.preventDefault();
		const {text, title} = this.state;
		if (title === '' || text === '') {
			return;
		}
		const {id, display_name} = this.props.user;
		const thread = {
			user_id: id,
			user_info: JSON.stringify({id, display_name}),
			text,
			title
		}
		
		forumController.postThread(thread)
			.then((res) => {
				const threads = this.state.threads
				res.data.user_info = JSON.stringify({display_name: this.props.user.display_name})
				threads.push(res.data)
				this.setState({
					title: '',
					text: '',
					isCreateMode: false,
					threads: threads
				})
			}).catch(e => {
				console.log(e);
			});

		this.getAllThreads()
		
	}

	render() {
		// Положить в контекст? передать в контекст и в локалсторадж?
		const threads = this.state.threads
		
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
											const {thread_id, title, user_info, text} = thread
											const display_name = JSON.parse(user_info).display_name
											return (
												<NavLink className="topic d-flex flex-column pt-4 pb-2 px-4 mb-4" to={`${Navigation.Forum}?id=${thread_id}`} key={thread_id}>
													<span className="thread_created mb-1">Создан: {display_name ? display_name : 'Неопознанный енот'}</span>
													<span className="thread_theme mb-2">{title}</span>
													<span className="thread_message px-1 py-2 mb-2">{text}</span>
													<span className="thread_comments">Коммментарии: {thread.comments ? thread.comments : 0}</span>
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

Threads.contextType = ForumContext

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Threads);
