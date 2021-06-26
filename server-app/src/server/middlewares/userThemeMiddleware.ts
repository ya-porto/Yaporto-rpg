import httpContext from 'express-http-context';
import {NextFunction, Request, Response} from 'express';

import {Themes, UserThemes} from '../../../db/sequelize';
import {sliceNames} from '../../redux/slicenames'


async function userThemeMiddleware (res: Response, req: Request, next: NextFunction) {
    // Получаем список тем с бека. В вызов передаем флаг чтоб нам вернулись только значения из таблицы, иначе придет вся структура в виде объекта
    const themes = await Themes.findAll({raw: true})
    .then((res) => {
        return res.map(item => {
            return {
            theme_id: item['theme_id'],
            theme_name: item['theme_name']
        }})
    })
    .catch(err => console.error(err))

    // Получаем айди юзера, она до этого положена в контекст мидддлварой с авторизацией
    const id = httpContext.get(sliceNames.user)?.id
    console.log(id)

    // Задаем дефолтное значение для подстраховки
    let userTheme: string | void | undefined = 'light'

    // Если юзер получен, идем в бд получать подключенную тему
    if(id) {
        console.log('я все равно пошел в базу')
        const response = await UserThemes.findOne({
            where: {
                user_id: id
            },
            raw: true
        })
        // Тут оно  ругается что такого ключа нет в типе Model из sequelize, если описывать типы по туториалу, тогда полностью ломается запрос в ручке на смену темы
        .then(res => {return res?.theme_id})
        .catch(err => console.error(err))

        // Проверяем что ответ пришел и он не undefined прежде чем переписывать переменную
        if (response) {
            userTheme = response
        }
    } 

    // Складываем в контекст чтобы передать дальше в миддлвару рендера страницы
    httpContext.set('userThemes', {themes: themes, theme: userTheme})
    // Передаем управление следующей миддлваре
    next()
}

export {userThemeMiddleware}