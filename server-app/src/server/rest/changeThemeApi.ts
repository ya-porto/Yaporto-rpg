import {Response, Request, NextFunction} from 'express';
import {UserThemes} from '../../../db/sequelize';

async function changeThemeApi (req: Request, res: Response, next: NextFunction) {
    const result = await UserThemes.update ({
        user_id: req.body.user_id,
        theme_id: req.body.theme_id
    }, {
        where: {
            user_id: req.body.user_id
        }
    })
    .catch(err => console.error(err))

    res.status(200).send(result)

    next()
}

export default changeThemeApi
