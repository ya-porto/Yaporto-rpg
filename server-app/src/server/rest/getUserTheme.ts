import {Response, Request, NextFunction} from 'express';
import {UserThemes} from '../../../db/sequelize';

async function getUserTheme (req: Request, res: Response, next: NextFunction) {
    const {id} = req.query
    let theme = 'light'
    if (id) {    
        const result = await UserThemes.findOne ({
            where: {
                user_id: id
            }
        }).then((r) => {
            return r?.getDataValue('theme_id')
        })
        .catch(err => console.error(err))
        
        if (result) {
            theme = result
        }
    }

    res.status(200).send(theme)

    next()
}

export default getUserTheme
