import {Request, Response} from 'express';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {App} from '../src/components/App';

function makeHTMLPage(content: string) {
	// Тут мы создаем страницу, которую будем раздавать
	const html = renderToStaticMarkup(
		<html lang="ru">
			<head>
				<title>From SSR with Love</title>
				<link rel="stylesheet" href="./css/style.css"></link>
			</head>
			<body>
				{/* Сюда вставляем срендеренное в строку содержание страницы */}
				<main id="app" dangerouslySetInnerHTML={{__html: content}} />
			</body>
		</html>
	);

	return `<!doctype html>${html}`;
}

export default (req: Request, res: Response) => {
	const location = req.url;
	const context: StaticRouterContext = {};
	const appContent = (
		<StaticRouter context={context} location={location}>
			<App />
		</StaticRouter>
	);
	// Здесь рендерим в строку jsx-компонент
	const reactDom = renderToString(appContent);

	if (context.url) {
		res.redirect(context.url);
		return;
	}

	res.send(makeHTMLPage(reactDom));
};
