import {Response, Request, NextFunction} from 'express';
import {Threads, Comments, Users} from '../../../db/sequelize';

async function  getAllThreads (req: Request, res: Response, next: NextFunction) {
    const threads = await Threads.findAll({
        raw: true,
        include: [{model: Users}]
    })
        .then((res) => {
            res.map(r => {
                delete r['User.user_id'];
                r['user_info'] = r['User.user_info']
                delete r['User.user_info']
            })
            return res
        })
        .catch(err => console.error(err))

    const comments: any = await Comments.count({
        col: 'thread_id',
        group: ['thread_id']
    })
        .then(res => {return res})
        .catch(err => console.error(err))

    threads?.forEach(thread => {
        const commentsForThread = comments?.find((comment: { [x: string]: number | string; }) => thread['thread_id'] === comment['thread_id'])
        Object.assign(thread, {count: commentsForThread?.count})
        });
        
        
    res.status(200).send(threads)
    next()
}

export {getAllThreads}