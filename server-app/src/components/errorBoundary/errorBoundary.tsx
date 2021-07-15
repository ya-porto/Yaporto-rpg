import React, {Component} from 'react';
import {isServer} from '../../utils/isServerEnvChecker'

import './errorBoundary.css';

class ErrorBoundary extends Component< {}, {error: null | Error, startLoad: number}> {
	constructor(props: {children: React.ReactChild}) {
		super(props);
		this.state = {
			error: null,
			startLoad: isServer ? 0 :  performance.now()
		};
	}

	static getDerivedStateFromError(error: Error) {
		return {error: error};
	}

	componentDidCatch(error: Error) {
		this.setState({
			error: error
		});
	}

	componentDidMount() {
		const endLoad = performance.now();
		console.info(`The application was loaded for ${endLoad - this.state.startLoad} ms`);
	}

	render() {
		if (this.state.error) {
			return <h1 className="ma-16">Что-то пошло не так.</h1>;
		}

		return this.props.children;
	}
}

export {ErrorBoundary}
