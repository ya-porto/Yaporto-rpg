import express, {Router} from 'express';

import {appRoutes} from './app';
import {staticRoutes} from './startc';
import {changeThemeApi, getAllThemes, getUserTheme, setThemeApi} from '../rest/index';
import {restEndpoints} from '../../utils/restEndpoints';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

appRoutes(router);
staticRoutes(router);

router.get(restEndpoints.getAllThemes, getAllThemes)
router.get(restEndpoints.getUserTheme, getUserTheme)
router.post(restEndpoints.changeTheme, changeThemeApi)
router.put(restEndpoints.changeTheme, setThemeApi)

export default router;
