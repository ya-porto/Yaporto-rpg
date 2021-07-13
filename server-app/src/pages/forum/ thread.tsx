import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {RootState} from '../../redux/types';
import {ThreadProps} from '../../controllers/forum/forum.type';
import {Button} from '../../components/button/index';
import {Input} from '../../components/input/index';
import {Menu} from '../../components/menu/menu';
import {ForumContext} from '../../utils/forumContext';
import {forumController} from '../../controllers/forum/index';
import {Navigation} from '../../client/constants';
import {isServer} from '../../utils/isServerEnvChecker';
import {parseQueryString} from '../../utils/parseQueryString';

import './thread.css';

interface IThread  {
	
	thread: ThreadProps | undefined | null,
	comment: string
}

interface Props extends ThreadProps {
	user?: RootState,
}
class Thread extends PureComponent<Props, IThread> {
	state = {
		thread: isServer ? this.context.thread : JSON.parse(localStorage.forum).thread,
		comment: ''
	}

	componentDidMount() {
		this.getAllComments()
	}

	getAllComments () {
		const id = parseInt(parseQueryString(window.location.search.substring(1)).id);
		forumController.getThreadById(id, this.props.user.id)
			.then(res => {
				this.setState({thread: res})
			})
			.catch(e => {
				console.log(e);
			});
	}

	reply = (commentMessage: string) => {
		this.setState({comment: `"${commentMessage.slice(0, 25)}..."`});
	}

	toggleLike = (comment_id: number) => {
		this.setState((state) => {
			const thread = this.state.thread
			thread?.comments?.find(comment => {
				comment.comment_id === comment_id ? !comment.liked : false
			})
			return {thread: thread}
		})
		console.log('renewed state',this.state.thread)
		// @ts-ignore

	}

	createComment = (event: Event) => {
		event.preventDefault()
		const {thread, comment} = this.state;
		if (comment === '') {
			return;
		}

		const {id, display_name, avatar} = this.props.user;
		const data = {
			user_info: JSON.stringify({display_name: display_name, avatar: avatar}),
			text: comment,
			user_id: id,
			thread_id: thread.thread_id
		}

		forumController.postComment(data)
			.then(() => {
				this.getAllComments();
			}).catch(e => {
				console.log(e);
			});
		this.setState({
			comment: '',
		})
	}

	render() {
		const {thread} = this.state;

		if (thread) {
			const {comments, user_info} = thread
			const user = JSON.parse(user_info)
			return (
				<div className={`${this.props.user.theme} page`}>
					<Menu />
					<div className="thread">
						<div className="card px-16 pb-10 pt-10 scroll d-flex flex-column">
							<NavLink className='button mb-5' to={Navigation.Forum}>
								Назад к тредам
							</NavLink>
										<div className="thread_topic d-flex flex-row">
											<div className="thread_starter d-flex flex-column justify-center align-center">
												<span className="thread_starter_avatar d-flex justify-center align-center">
													<img src={user.avatar} />
												</span>
												<span className="thread_starter_login">{user.display_name ? user.display_name : 'Неопознанный енот'}</span>
											</div>
											<div className="thread_topic_message py-6 px-3">
												{thread?.text}
											</div>
										</div>
	
										{comments?.map((comment) => {
											const {text, user_info, count, comment_id, liked} = comment;
											const user = JSON.parse(user_info)
											return (
												<div className="thread_comment relative d-flex flex-row mt-6" key={comment_id}>
													<button className="thread_reply_button" onClick={() => this.reply(text)}>Ответить</button>
													<div className="thread_commentator d-flex flex-column justify-center align-center">
														<span className="thread_commentator_avatar d-flex justify-center align-center">
															<img src={user.avatar} />
														</span>
														<span className="thread_commentator_login">
															{user.display_name ? user.display_name : 'Неопознанный енот'}
														</span>
													</div>
													<div className="thread_comment_message py-6 px-3">
														{text}
													</div>
													<i className={`${liked ? 'fas' : 'far'} fa-heart like-icon pointer`} onClick={() => this.toggleLike(comment_id)}></i>
												</div>
											);
										})}   
	
										<form className="thread_comment_field d-flex flex-column align-center mt-6">
											<Input className="thred_input" onChange={(event) => this.setState({comment: event.target.value})} value={this.state.comment} type="textarea" placeholder="Ваш комментарий" />
											<Button className="thread_button mt-6 py-2" onClick={this.createComment}>Написать комментарий</Button>
										</form>
	
						</div>
					</div>
				</div>
	
			);
		} else {
			return (
				<div className={`${this.props.user.theme} page`}>
				<Menu />
				<div className="thread">
					<div className="card px-16 pb-10 pt-10 scroll d-flex flex-column">
						<NavLink className='button mb-5' to={Navigation.Forum}>
							Назад к тредам
						</NavLink>

						<p> Подгружаем данные </p>	

					</div>
				</div>
			</div>
			)
		}
	}
}

Thread.contextType = ForumContext


const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Thread);
