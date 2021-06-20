import path from 'path';
import {ChunkExtractor} from '@loadable/server';
import {Request, Response} from 'express';
import React from 'react';
import {StaticRouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import parse from 'html-react-parser';
import httpContext from 'express-http-context';

import {App} from '../components/App';
import {createStore, reducers} from '../redux/rootStore';

export default (req: Request, res: Response) => {
	const statsFile = path.resolve('./dist/loadable-stats.json');
	const chunkExtractor = new ChunkExtractor({statsFile});

	const location = req.url;
	const context: StaticRouterContext = {};

	const userData = {user: httpContext.get('user')};
	const store = createStore(reducers, userData);

	const appContent = chunkExtractor.collectChunks(
		<Provider store={store}>
			<StaticRouter context={context} location={location}>
				<App />
			</StaticRouter>
		</Provider>
	);
	// Здесь рендерим в строку jsx-компонент
	const reactDom = renderToString(appContent);
	const reduxState = store.getState();

	if (context.url) {
		res.redirect(context.url);
		return;
	}

	res.send(makeHTMLPage(reactDom, chunkExtractor, reduxState));
};

function makeHTMLPage(reactDom: string, chunkExtractor: ChunkExtractor, reduxState = {}) {
	// Нужно будет понять зачем и как это рендерить
	const scriptTags = chunkExtractor.getScriptTags();

	// Тут мы создаем страницу, которую будем раздавать
	const html = renderToStaticMarkup(
		<html lang="ru">
			<head>
				<title>From SSR with Love</title>
				<link rel="stylesheet" href="./css/style.css"></link>
			</head>
			<body>
				<main id="app">{parse(reactDom)}</main>
				<script dangerouslySetInnerHTML={{
					__html: `window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}`
				}} />
				{parse(scriptTags)}
			</body>
		</html>
	);
	return `<!doctype html>${html}`;
}
