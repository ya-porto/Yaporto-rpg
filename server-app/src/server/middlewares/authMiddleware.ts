import axios from 'axios';
import {NextFunction, Request, Response} from 'express';
import httpContext from 'express-http-context';

import {sliceNames} from '../../redux/slicenames';
import {userInitialState} from '../../redux/userSlice'

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const cookies = Object
		.entries(req.cookies)
		.map(([key, value]) => `${key}=${value}`)
		.join(';');

	try {
		const {data} = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
			headers: {Cookie: cookies}
		})
		data['isAuth'] = true
		httpContext.set(sliceNames.user, data);
	} catch(err) {
		httpContext.set(sliceNames.user, userInitialState)
		console.error(err.response.status)
	}

	await next();
}

export {authMiddleware};
