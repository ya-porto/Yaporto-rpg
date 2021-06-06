import {ErrorRequestHandler, RequestHandler, Router} from 'express';
import cookieParserMiddleware from 'cookie-parser';
import csrfMiddleware from 'csurf';

import render from '../server-render-middleware';
import {ROUTES} from '../../client/routes';

const allRoutes = (function flatRoutes(routesMap: object): string[] {
	return Object.values(routesMap).reduce<string[]>(
		(routes, path) =>
			routes.concat(typeof path === 'object' ? flatRoutes(path) : path),
		[]
	);
})(ROUTES);

const middleware: Array<RequestHandler | ErrorRequestHandler> = [
	cookieParserMiddleware(),
	csrfMiddleware({cookie: true})
];

export function appRoutes(router: Router) {
	router.get(allRoutes, middleware, render);
}
