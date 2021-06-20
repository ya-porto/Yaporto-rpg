import express from 'express';
import router from './router';
import fs from 'fs';
import https from 'https';
import {MongoClient} from 'mongodb';

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
	key: key,
	cert: cert
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(router);


// Чтобы эта байда завелась в host надо вписать 127.0.0.1 local.ya-praktikum.tech
// Скорее всего в хроме надо будет отключить проверку безопасности сайтов тк этот сертификат ему не будет нравится даже если его установить и добавить в доверенные
// Не забудьте что теперь открывать надо https://local.ya-praktikum.tech:PORT
const server = https.createServer(options, app);


const login = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD

const uri = `mongodb://${login}:${password}@${process.env.MONGO_HOST}:27017`;
const dbName = 'docker'

const client = new MongoClient(uri)

client.connect(function(err) {
	if(err) {
		console.error('Cant connect to MongoDB');
		throw err;
	}

	console.log('Connected successfully to server');

	const db = client.db(dbName);

	server.listen(PORT, () => {
		console.log(`Example app listening on port ${PORT}`);
		console.log('Database: ', db);
	});
})




