import React from 'react';
import {authController} from '../controllers/auth';
import {Redirect} from 'react-router-dom';
import {Preloader} from './preloader';

const requireAuthentication = (Component: any) => {
	return class Apps extends React.Component {
		state = {
			isAuthenticated: false,
			isLoading: true
		}

		componentDidMount() {
			authController.getUserInfo()
				.then(() => {
					this.setState({isAuthenticated: true, isLoading: false});
				}).finally(() => {
					this.setState({
						isLoading: false
					});
				});
		}

		render() {
			const {isAuthenticated, isLoading} = this.state;

			if (isLoading) {
				return <Preloader />;
			}

			if (!isAuthenticated) {
				return <Redirect to="/signin" />;
			}

			return <Component {...this.props} />;
		}
	};
};

export {requireAuthentication};
