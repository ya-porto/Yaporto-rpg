import {ErrorRequestHandler, RequestHandler, Router} from 'express';
import cookieParserMiddleware from 'cookie-parser';
import csrfMiddleware from 'csurf';
import {authMiddleware} from '../authMiddleware';
import httpContext from 'express-http-context';

import render from '../server-render-middleware';
import {ROUTES} from '../../client/routes';

const allRoutes = (function flatRoutes(routesMap: object): string[] {
	return Object.values(routesMap).reduce<string[]>(
		  (routes, path) =>
			  routes.concat(typeof path.INDEX === 'object' ? flatRoutes(path.INDEX) : path.INDEX),
		  []
	  );
  })(ROUTES);

const middleware: Array<RequestHandler | ErrorRequestHandler | any> = [
	cookieParserMiddleware(),
	csrfMiddleware({cookie: true}),
	httpContext.middleware,
	authMiddleware
];

export function appRoutes(router: Router) {
	router.get(allRoutes, middleware, render);
}
