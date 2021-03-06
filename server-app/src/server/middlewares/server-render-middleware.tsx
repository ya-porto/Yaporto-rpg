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

import {App} from '../../components/App';
import {ErrorBoundary}  from '../../components/errorBoundary/errorBoundary';
import {createStore, reducers} from '../../redux/rootStore';
import {sliceNames} from '../../redux/slicenames';
import {ForumContext} from '../../utils/forumContext';

export default (req: Request, res: Response) => {
	const statsFile = path.resolve('./dist/loadable-stats.json');
	const chunkExtractor = new ChunkExtractor({statsFile});

	const location = req.url;
	const context: StaticRouterContext = {};

	const userData = httpContext.get(sliceNames.user)
	const threads = httpContext.get('threads')
	const thread = httpContext.get('thread')
	const forum = {threads: threads, thread: thread}

	const preloadedData = {user: userData}
	const store = createStore(reducers, preloadedData);

	const appContent = chunkExtractor.collectChunks(
		<Provider store={store}>
			<StaticRouter context={context} location={location}>
				<ForumContext.Provider value={forum}>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</ForumContext.Provider>
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

	res.send(makeHTMLPage(reactDom, chunkExtractor, reduxState, forum));
};

function makeHTMLPage(reactDom: string, chunkExtractor: ChunkExtractor, reduxState = {}, forum ={}) {
	const scriptTags = chunkExtractor.getScriptTags();

	// Тут мы создаем страницу, которую будем раздавать
	const html = renderToStaticMarkup(
		<html lang="ru">
			<head>
				<title>From SSR with Love</title>
				<link rel="stylesheet" href="/css/style.css"></link>
			</head>
			<body>
				<main id="app">{parse(reactDom)}</main>
				<script dangerouslySetInnerHTML={{
					__html: `window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}`
				}} />
				<script dangerouslySetInnerHTML={{
					__html: `window.storage = ${JSON.stringify(forum)}`
				}} />
				{parse(scriptTags)}
			</body>
		</html>
	);
	return `<!doctype html>${html}`;
}
