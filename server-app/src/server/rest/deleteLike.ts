
import {Response, Request, NextFunction} from 'express';
import {Likes} from '../../../db/sequelize';

async function deleteLike(req: Request, res: Response, next: NextFunction) {
    await Likes.destroy({
        where: {
            comment_id: req.body.comment_id,
            user_id: req.body.user_id
        }
    })
        .then((res) => res)
        .catch(err => {
            console.error(err)
            res.status(500)
        })
    res.status(200).send('unliked')   
    next()
}

export {deleteLike}