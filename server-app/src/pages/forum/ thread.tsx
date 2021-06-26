import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {ThreadProps} from './thread.type';
import {Button} from '../../components/button/index';
import {Input} from '../../components/input/index';
import {Menu} from '../../components/menu/menu';
import {threadMock} from '../../_mocks/forumMocks';

import './thread.css';

interface IThread extends ThreadProps {
	user: RootState
}
class Thread extends PureComponent<IThread> {
	state = {
		thread: threadMock,
		reply: ''
	}

	reply = (commentMessage: string) => {
		console.log(commentMessage)
		this.setState({reply: '"' + commentMessage.slice(0, 25) + '...' + '"'})
	}
	render() {
		const {threadStarter, message, comments} = this.state.thread
		return (
			<div className={`${this.props.user.theme} page`}>
				<Menu />
				<div className="thread">
					<div className="card px-16 pb-10 pt-10 scroll">
						<div className="thread_topic d-flex flex-row">
							<div className="thread_starter d-flex flex-column justify-center align-center">
								<span className="thread_starter_avatar mb-2">
									<img src={threadStarter?.avatar} />
								</span>
								<span className="thread_starter_login">{threadStarter?.login}</span>
							</div>
							<div className="thread_topic_message py-6 px-3">
								{message}
							</div>
						</div>

						{comments?.map((comment, i) => {
							const {commentMessage} = comment
							return (
								<div className="thread_comment relative d-flex flex-row mt-6" key={i}>
									<button className="thread_reply_button" onClick={() => this.reply(commentMessage)}>Ответить</button>
									<div className="thread_commentator d-flex flex-column justify-center align-center">
										<span className="thread_commentator_avatar mb-2">
											<img src={comment.commentator.avatar} />
										</span>
										<span className="thread_commentator_login">
											{comment.commentator.login}
										</span>
									</div>
									<div className="thread_comment_message py-6 px-3">
										{commentMessage}
									</div>
								</div>
							);
						})}

						<form className="thread_comment_field d-flex flex-column align-center mt-6">
							<Input className="thred_input" value={this.state.reply} type="textarea" placeholder="Ваш комментарий" />
							<Button className="thread_button mt-6 py-2">Написать комментарий</Button>
						</form>
					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Thread);
