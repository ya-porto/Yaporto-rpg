import httpContext from 'express-http-context';
import {NextFunction, Request, Response} from 'express';

import {Threads, Comments, Likes, Users} from '../../../db/sequelize';
import {sliceNames} from '../../redux/slicenames';

async function forumMiddleware (req: Request, res: Response,  next: NextFunction) {
    // Проверяем был ли авторизован пользователь прежде чем вообще идти за данными по форуму
    const user = httpContext.get(sliceNames.user)
    if (!user.id) {
        next()
    }

    // Получаем список тредов с бека
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

// Приходится пока оставить any. Метод count с этими параметрами возвращает массив объектов, а в типах указан возвращаемый тип number. И ниже идет конфликт
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

    httpContext.set('threads', threads)

    // А теперь проверяем не захотел ли пользователь открыт конкретный тред
    const {id} = req.query
    
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
                user_id: user.id
            }
        })

        likedByUser?.forEach((like: { [x: string]: number | string; }) => {
            comments?.forEach(comment => {
                like['comment_id'] === comment['comment_id'] ? comment['liked'] = true : comment['liked'] = false
            })
        });

        Object.assign(thread, {comments: comments})

        httpContext.set('thread', thread)
    }

    next ()
}

export {forumMiddleware}

