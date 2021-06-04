import express from 'express';
import router from './router';

const app = express();
const PORT = process.env.PORT || 4000;

app
	.disable('x-powered-by')
	.use(router);

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});
