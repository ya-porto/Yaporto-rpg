import express, { Router } from 'express';

import { appRoutes } from './app';
import { staticRoutes } from './startc';
import {
    changeThemeApi,
    getAllThemes,
    getUserTheme, 
    setThemeApi, 
    postThread, 
    postComment, 
    postLike,
    deleteLike,
    setUserInfo, 
    getAllThreads,
    getThreadById
} from '../rest/index';
import { restEndpoints } from '../../utils/restEndpoints';

// eslint-disable-next-line new-cap
const router: Router = express.Router();

appRoutes(router);
staticRoutes(router);

router.get(restEndpoints.getAllThemes, getAllThemes)
router.get(restEndpoints.getUserTheme, getUserTheme)
router.post(restEndpoints.changeTheme, changeThemeApi)
router.put(restEndpoints.changeTheme, setThemeApi)
router.post(restEndpoints.forumThread, postThread)
router.get(restEndpoints.getALlThreads, getAllThreads)
router.get(restEndpoints.forumThread, getThreadById)
router.post(restEndpoints.forumComment, postComment)
router.post(restEndpoints.forumLike, postLike)
router.post(restEndpoints.deleteLike, deleteLike)
router.post(restEndpoints.userInfo, setUserInfo)

export default router;
