import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { Request, Response } from 'express';
import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import App from './components/App';

export default (req: Request, res: Response) => {

    const statsFile = path.resolve('./dist/loadable-stats.json');
    const chunkExtractor = new ChunkExtractor({ statsFile });

    const appContent = chunkExtractor.collectChunks(<App />)
    // Здесь рендерим в строку jsx-компонент
    const reactDom = renderToString(appContent);
    res.send(makeHTMLPage(reactDom, chunkExtractor));
    
}

function makeHTMLPage(reactDom: string, chunkExtractor: ChunkExtractor) {
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
                ${scriptTags}
            </body>
        </html>,
    )`;
  }


