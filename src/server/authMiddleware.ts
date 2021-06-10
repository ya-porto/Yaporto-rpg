import axios from 'axios';
import { NextFunction, Request,Response } from 'express';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = Object
            .entries(req.cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join(';');
    console.log(cookies)
    
    try {
        const {data} = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
            headers: {Cookie: cookies}
        })
        console.log(data)
    } catch (err) {

    }

    await next();
};
export {authMiddleware};


// import {Context, Next} from 'koa';
// import axios from 'axios';

// const PRAKTIKUM_AUTH_ENDPOINT = '<https://ya-praktikum.tech/api/v2/auth/user>';
// async function authMiddleware(ctx: Context, next: Next) {
//     const authData = {
//         authCookie: ctx.cookies.get('authCookie'),
//         uuid: ctx.cookies.get('uuid'),
//     };
//     const cookies = Object
//         .entries(authData)
//         .map(([key, value]) => `${key}=${value}`)
//         .join(';');
//         console.log
//     try {
//         const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
//             headers: { Cookie: cookies },
//         });
//         console.log(data)
//         ctx.state.user = data;
//     } catch (err) {
//         ctx.state.user = null;
//     }
//     await next();
// };
// export {authMiddleware};