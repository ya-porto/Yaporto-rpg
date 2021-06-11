import express from 'express';
import router from './router';
import fs from 'fs';
import https from 'https';

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
	key: key,
	cert: cert
  };

const app = express();
const PORT = process.env.PORT || 4000;
 
app.use(router);

// Чтобы эта байда завелась в host надо вписать 127.0.0.1 local.ya-praktikum.tech
// Скорее всего в хроме надо будет отключить проверку безопасности сайтов тк этот сертификат ему не будет нравится даже если его установить и добавить в доверенные
// Не забудьте что теперь открывать надо https://local.ya-praktikum.tech:PORT
const server = https.createServer(options, app);
server.listen(PORT,  () => {
	console.log(`Example app listening on port ${PORT}`)
}
);

