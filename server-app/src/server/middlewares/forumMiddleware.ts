import httpContext from 'express-http-context';
import {NextFunction, Request, Response} from 'express';

import {Threads, Comments, Likes, Users} from '../../../db/sequelize';
import {sliceNames} from '../../redux/slicenames';

async function forumMiddleware (res: Response, req: Request, next: NextFunction) {
    // Проверяем ьыл ли авторизован пользователь прежде чем вообще идти за данными по форуму
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

    // const allComments = await Comments.findAll({raw:true})
    // console.log('threads', threads)
    // console.log('allComments', allComments)

    // const likes = await Likes.findAll({raw: true}).then(res => res).catch(e => console.error(e))
    // const users = await Users.findAll({raw: true}).then(res => res).catch(e => console.error(e))
    // console.log('likes', likes)
    // console.log('users', users)

    threads?.forEach(thread => {
       const commentsForThread = comments?.find((comment: { [x: string]: number | string; }) => thread['thread_id'] === comment['thread_id'])
       Object.assign(thread, {count: commentsForThread?.count})
    });


    
    httpContext.set('threads', threads)

    next ()
}

export {forumMiddleware}

