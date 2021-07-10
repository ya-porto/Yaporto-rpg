import {Response, Request, NextFunction} from 'express';
import {Users} from '../../../db/sequelize';

async function setUserInfo (req: Request, res: Response, next: NextFunction) {
    const id = req.body.user_id
    if (id) {
        const result = await Users.upsert ({
            user_id: req.body.user_id,
            user_info: JSON.stringify({display_name: req.body.display_name})
        })
        .catch(err => console.error(err))
    
        res.status(200).send(result)
    }
    res.status(500)

    next()
}

export {setUserInfo}