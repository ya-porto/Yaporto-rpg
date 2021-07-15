
import {Response, Request, NextFunction} from 'express';
import {Comments} from '../../../db/sequelize';

async function  postComment (req: Request, res: Response, next: NextFunction) {
    const result = await Comments.create({
        thread_id: req.body.thread_id,
        comment_id: req.body.comment_id,
        user_id: req.body.user_id,
        user_info: req.body.user_info,
        text: req.body.text
    })
        .then((res) => res)
        .catch(err => {
            console.error(err)
        })
        res.status(201).send(result)
    next()
}

export {postComment}