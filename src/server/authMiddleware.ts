import axios from 'axios';
import { NextFunction, Request,Response } from 'express';
import httpContext from 'express-http-context';

import {toggleAuthFlag} from '../utils/changeAuthFlag';

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
        //  Меняем флаг для рендера меню

        if(!data['isAuth']) {
            toggleAuthFlag(data)
        }

        httpContext.set('user', data)

    } catch (err) {
        
    }

    await next();
};
export {authMiddleware};