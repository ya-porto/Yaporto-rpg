import express from 'express';
import router from './router';
import fs from 'fs';
import https from 'https';

import {sequelize} from '../../db/sequelize';
import {IS_DEV} from '../../webpack/env';

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
	key: key,
	cert: cert
};


const app = express();
const PORT = process.env.PORT || 3000;

// express.json тут нужен чтоб прочитать тело запроса в последующих ручках. иначе будет андефайнд
app.use(express.json())
app.use(router);


// Чтобы эта байда завелась в host надо вписать 127.0.0.1 local.ya-praktikum.tech
// Скорее всего в хроме надо будет отключить проверку безопасности сайтов тк этот сертификат ему не будет нравится даже если его установить и добавить в доверенные
// Не забудьте что теперь открывать надо https://local.ya-praktikum.tech:PORT
const server = https.createServer(options, app);


server.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
})


// Начинаем подключаться к БД
sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error("Unable to connect to the database:", err);
  });

  IS_DEV ? 
  // параметр force насильно пересоздает таблицу в БД с заданными нами значениями. Для отладки, поэтому тут условие на ДЕВ
  // Сначала вызываем sync чтобы создать пустые таблицы которые мы описали в другом файле
  sequelize.sync({force: true}).then(() => {
	  // Названия всех Инициированных таблиц лежат в объекте models. Берем оттуда таблицу с темами и сразу записываем нужные нам данные. Они не будут меняться по запросу
	sequelize.models.Themes.bulkCreate([{
		theme_id: 'light',
		theme_name: 'Светлая'
	}, {
		theme_id: 'dark',
		theme_name: 'Темная'
	}],{
		// Этот параметр для того чтоб посмотреть что мы там сделали
		returning: true
	})

	sequelize.models.UserThemes.create({
		user_id: 585,
		theme_id: 'light'
	})
	// eslint-disable-next-line no-console
	.then(() => console.log('Themes created'))
	.catch(err => console.error(err))
	// eslint-disable-next-line no-console
    console.log('Tables created', sequelize.models)
})
	.catch(err => {
		// eslint-disable-next-line no-console
		console.error("Unable to create tables:", err)
	}) 
	
	:
	// А вот тут уже боевое подключение в продакшн
	sequelize.sync().then(() => {
		sequelize.models.Themes.bulkCreate([{
			theme_id: 'light',
			theme_name: 'Светлая'
		}, {
			theme_id: 'dark',
			theme_name: 'Темная'
		}])
		// eslint-disable-next-line no-console
		.then(() => console.log('Themes created'))
		.catch(err => console.error(err))
		// eslint-disable-next-line no-console
		console.log('Tables created')
	})
		.catch(err => {
			// eslint-disable-next-line no-console
			console.error("Unable to create tables:", err)
		})



