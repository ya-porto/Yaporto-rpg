import path from 'path';
import {ChunkExtractor} from '@loadable/server';
import {Request, Response} from 'express';
import React from 'react';
import {StaticRouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {App} from './components/App';
import {StaticRouter} from 'react-router-dom';
import {createReduxStore, getInitialState} from './redux/rootStore';

export default (req: Request, res: Response) => {
	const statsFile = path.resolve('./dist/loadable-stats.json');
	const chunkExtractor = new ChunkExtractor({statsFile});

	const location = req.url;
	const context: StaticRouterContext = {};
	const {store} = createReduxStore(getInitialState(location), location);

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
	const scriptTags = chunkExtractor.getScriptTags();
	// Тут мы создаем страницу, которую будем раздавать
	return `
        <html lang="ru">
            <head>
                <title>From SSR with Love</title>
                <link rel='stylesheet' href='./css/style.css'></link>
            </head>
            <body>
                <main id="app" dangerouslySetInnerHTML={{__html: ${reactDom}}} />
								<script>
										window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
								</script>
								${scriptTags}
            </body>
        </html>,
    )`;
}
