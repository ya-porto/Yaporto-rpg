import {Response, Request, NextFunction} from 'express';
import {Themes} from '../../../db/sequelize';

async function  getAllThemes (req: Request, res: Response, next: NextFunction) {
    const result = await Themes.findAll({raw: true})
        .then((r) => {
            return r.map(item => {
                return {
                theme_id: item['theme_id'],
                theme_name: item['theme_name']
            }})
        })
        .catch(err => console.error(err))
        res.status(200).send(result)

    next()
}

export {getAllThemes}