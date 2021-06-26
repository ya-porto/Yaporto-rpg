import express, {Router} from 'express';

import {appRoutes} from './app';
import {staticRoutes} from './startc';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

appRoutes(router);
staticRoutes(router);

export default router;
