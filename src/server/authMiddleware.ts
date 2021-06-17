import axios from 'axios';
import {NextFunction, Request, Response} from 'express';
import httpContext from 'express-http-context';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const cookies = Object
		.entries(req.cookies)
		.map(([key, value]) => `${key}=${value}`)
		.join(';');

	try {
		const {data} = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
			headers: {Cookie: cookies}
		});
		httpContext.set('user', data);
	/* eslint-disbale-next-line */
	} catch (err) {
		console.log(err)
	}

	await next();
}

export {authMiddleware};
