import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {ThreadProps} from './thread.type';
import {Button} from '../../components/button/index';
import {Input} from '../../components/input/index';
import {Menu} from '../../components/menu/menu';
import {threadMocks} from '../../_mocks/forumMocks';
import {parseQueryString} from 'utils/parseQueryString';

import {getWindow} from 'ssr-window';
const window = getWindow();

import './thread.css';

interface IThread extends ThreadProps {
	user: RootState,
	threadData: ThreadProps | undefined
}
class Thread extends PureComponent<IThread> {
	state = {
		// Знаю, что так нельзя. Нужно будет убрать при подключении бекенда
		threadData: threadMocks.find(x => x.id === parseInt(parseQueryString(window.location.search.substring(1)).id)),
		reply: ''
	}

	reply = (commentMessage: string) => {
		this.setState({reply: `"${commentMessage.slice(0, 25)}..."`});
	}

	render() {
		const {threadData} = this.state;
		console.log(threadMocks.find(x => {
			return x.id === parseQueryString(window.location.search.substring(1)).id;
		}));

		return (
			<div className={`${this.props.user.theme} page`}>
				<Menu />
				<div className="thread">
					<div className="card px-16 pb-10 pt-10 scroll">
						<div className="thread_topic d-flex flex-row">
							<div className="thread_starter d-flex flex-column justify-center align-center">
								<span className="thread_starter_avatar d-flex justify-center align-center">
									<img src={threadData?.author.avatar} />
								</span>
								<span className="thread_starter_login">{threadData?.author.name}</span>
							</div>
							<div className="thread_topic_message py-6 px-3">
								{threadData?.text}
							</div>
						</div>

						{threadData?.comments?.map((comment, i) => {
							const {text, author, likes} = comment;
							return (
								<div className="thread_comment relative d-flex flex-row mt-6" key={i}>
									<button className="thread_reply_button" onClick={() => this.reply(text)}>Ответить</button>
									<div className="thread_commentator d-flex flex-column justify-center align-center">
										<span className="thread_commentator_avatar d-flex justify-center align-center">
											<img src={author.avatar} />
										</span>
										<span className="thread_commentator_login">
											{author.name}
										</span>
									</div>
									<div className="thread_comment_message py-6 px-3">
										{text}
									</div>
									<i className={`${likes.find(x => x === this.props.user.id) ? 'fas' : 'far'} fa-heart like-icon`}></i>
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
