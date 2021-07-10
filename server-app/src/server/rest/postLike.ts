
import {Response, Request, NextFunction} from 'express';
import {Likes} from '../../../db/sequelize';

async function  postLike (req: Request, res: Response, next: NextFunction) {
    const result = await Likes.create({
        comment_id: req.body.comment_id,
        user_id: req.body.user_id
    })
        .then((res) => res)
        .catch(err => {
            console.error(err)
            res.status(500)
        })
    res.status(201).send(result)   
    next()
}

export {postLike}