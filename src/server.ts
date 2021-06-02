import express from 'express';
import severRenderMiddleware from './server-render-middleware';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('./dist'));

// Тут мы импортируем срендеренную страницу и раздаем ее с сервера
app.get('*', severRenderMiddleware);

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});
