import {Response, Request, NextFunction} from 'express';
import {Threads, Comments, Likes, Users} from '../../../db/sequelize';

async function getThreadById (req: Request, res: Response, next: NextFunction) {
    const {id, user_id} = req.query

    if (id) {

        const thread = await Threads.findOne({
            raw: true,
            where: {
                thread_id: id
            },
            include: [{model: Users}]
        }).then((res) => {
            if (res) {
                delete res['User.user_id'];
                res['user_info'] = res['User.user_info']
                delete res['User.user_info']
            }
            return res
        })
        .catch(err => console.error(err))

        const comments = await Comments.findAll({
            raw: true,
            where: {
                thread_id: id
            },
            include: [{model: Users}],
            order: ['comment_id']
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
        
        const likes: any = await Likes.count({
            col: 'comment_id',
            group: ['comment_id']
        })




        comments?.forEach(comment => {
            const likesForComment = likes?.find((like: { [x: string]: number | string; }) => comment['comment_id'] === like['comment_id'])
            Object.assign(comment, {count: likesForComment?.count})
         });

        const likedByUser: any = await Likes.findAll({
            raw: true,
            where: {
                user_id: user_id
            }
        })

        likedByUser?.forEach((like: { [x: string]: number | string; }) => {
            comments?.forEach(comment => {
                like['comment_id'] === comment['comment_id'] ? comment['liked'] = true : comment['liked'] = false
            })
        });

        Object.assign(thread, {comments: comments})

        res.status(200).send(thread)
    }

    next()
}

export {getThreadById}
