import {Response, Request} from 'express';
import {UserThemes} from '../../../db/sequelize';

const  changeThemeApi = (req: Request, res: Response) => {
    UserThemes.create ({
        user_id: req.body.user_id,
        theme_id: req.body.theme_id
    })
    .then((result) => res.json(result))
    .catch(err => console.error(err))
}

export{changeThemeApi}