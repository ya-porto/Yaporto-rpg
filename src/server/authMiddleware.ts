import {Context, Next} from 'koa';
import axios from 'axios';

const PRAKTIKUM_AUTH_ENDPOINT = '<https://ya-praktikum.tech/api/v2/auth/user>';
async function authMiddleware(ctx: Context, next: Next) {
    const authData = {
        authCookie: ctx.cookies.get('authCookie'),
        uuid: ctx.cookies.get('uuid'),
    };
    const cookies = Object
        .entries(authData)
        .map(([key, value]) => `${key}=${value}`)
        .join(';');
    try {
        const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
            headers: { Cookie: cookies },
        });
        console.log(data)
        ctx.state.user = data;
    } catch (err) {
        ctx.state.user = null;
    }
    await next();
};
export {authMiddleware};