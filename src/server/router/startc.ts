import {resolve} from 'path';
import {Router, static as staticRoute} from 'express';

export const staticRoutes = (router: Router) => {
	router
		.use('/', staticRoute(resolve(__dirname, '../dist')));
};
