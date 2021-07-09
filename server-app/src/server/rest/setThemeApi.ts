import {Response, Request, NextFunction} from 'express';
import {UserThemes} from '../../../db/sequelize';

async function setThemeApi (req: Request, res: Response, next: NextFunction) {
    const id = req.body.user_id

    if (id) {
        const result = await UserThemes.create ({
            user_id: req.body.user_id,
            theme_id: req.body.theme_id
        })
        .catch(err => console.error(err))
    
        res.status(200).send(result)
    }
    res.status(500)

    next()
}

export {setThemeApi}
