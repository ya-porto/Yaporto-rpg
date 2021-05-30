import { Request, Response } from 'express';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import App from '../src/components/App';

function makeHTMLPage(content: string) {
    // Тут мы создаем страницу, которую будем раздавать
    const html =  renderToStaticMarkup(
        <html lang="ru">
            <head>
                <title>From SSR with Love</title>
                <link rel='stylesheet' href='./css/style.css'></link>
            </head>
            <body>
                {/* Сюда вставляем срендеренное в строку содержание страницы*/}
                <main id="app" dangerouslySetInnerHTML={{__html: content}} />
            </body>
        </html>,
    );

    return `<!doctype html>${html}`
  }

export default (req: Request, res: Response) => {
    const appContent = (<App />)
    // Здесь рендерим в строку jsx-компонент
    const reactDom = renderToString(appContent);
    res.send(makeHTMLPage(reactDom));
}
