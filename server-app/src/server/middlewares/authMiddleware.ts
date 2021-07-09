import axios from 'axios';
import {NextFunction, Request, Response} from 'express';
import httpContext from 'express-http-context';
import { Navigation } from '../../client/constants';

import {sliceNames} from '../../redux/slicenames';
import { ROUTES } from './../../client/routes';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const cookies = Object
		.entries(req.cookies)
		.map(([key, value]) => `${key}=${value}`)
		.join(';');
	
	const requestingRouteObject = Object.values(ROUTES).find(x => x.INDEX === req.url);
	const isNeedAuth = requestingRouteObject && requestingRouteObject.AUTH;

	// Проверяю авторизацию в любом случае
	try {
		const {data} = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
			headers: {Cookie: cookies}
		})
		data['isAuth'] = true
		httpContext.set(sliceNames.user, data);

		// Если авторизован, то не пускаю на страницы авторизации
		if (req.url === ROUTES.SIGNIN.INDEX || req.url === ROUTES.SIGNUP.INDEX) {
			res.redirect(ROUTES.MAIN.INDEX);
		}
	} catch (err) {
		// Если неавторизован, а надо, то пускаю на авторизацию
		if (isNeedAuth) {
			if (err.response.status === 401) {
				res.redirect(ROUTES.SIGNIN.INDEX);
			} else {
				console.log(err);
			}
		}
		// Если неавторизован и это не надо, то ничего не делаю (ниже пускаю куда стучался)
	}

	await next();
}

export {authMiddleware};
