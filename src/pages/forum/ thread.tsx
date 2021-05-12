import React, {PureComponent} from 'react';
import {ThreadProps} from './thread.type';
import {Button} from '../../components/button/index';
import {Input} from '../../components/input/index';
import {Menu} from '../../components/menu/menu';

import './thread.css';

export class Thread extends PureComponent<ThreadProps> {
	render() {
		return (
				<div className="thread_page page relative px-14 pt-10">
					<Menu />
					<div className="wrapper d-flex flex-column pa-6">
						<div className="thread_topic d-flex flex-row">
							<div className="thread_starter d-flex flex-column justify-center align-center">
								<span className="thread_starter_avatar mb-2">
									<img src={this.props.threadStarter?.avatar} />
								</span>
								<span className="thread_starter_login">{this.props.threadStarter?.login}</span>
							</div>
							<div className="thread_topic_message py-6 px-3">
								{this.props.message}
							</div>
						</div>

						{this.props.comments?.map((comment, i) => {
							return (
								<div className="thread_comment d-flex flex-row mt-6" key={i}>
									<div className="thread_commentator d-flex flex-column justify-center align-center">
										<span className="thread_commentator_avatar mb-2">
											<img src={comment.commentator.avatar} />
										</span>
										<span className="thread_commentator_login">
											{comment.commentator.login}
										</span>
									</div>
									<div className="thread_comment_message py-6 px-3">
										{comment.commentMessage}
									</div>
								</div>
							);
						})}

						<form className="thread_comment_field d-flex flex-column mt-6">
							<Input value="" type="textarea" placeholder="Ваш комментарий" />
							<Button onClick={() => {}} className="green mt-6">Написать комментарий</Button>
						</form>
					</div>
				</div>
			
		);
	}
}
