import {Response, Request, NextFunction} from 'express';
import {Threads} from '../../../db/sequelize';

async function  postThread (req: Request, res: Response, next: NextFunction) {
    const result = await Threads.create({
        thread_id: req.body.thread_id,
        user_id: req.body.user_id,
        user_info: req.body.user_info,
        title: req.body.title,
        text: req.body.text
    })
        .then((res) => res)
        .catch(err => {
            console.error(err)
        })
    res.status(201).send(result)
    next()
}

export {postThread}