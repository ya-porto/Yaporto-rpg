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

// Чтобы эта байда завелась в chrome надо перейти в chrome://flags/#allow-insecure-localhost и включить разрешение на переход по всратым сертификатам
// Не забудьте что теперь открывать надо https://localhost
const server = https.createServer(options, app);
server.listen(4000, () => {
	console.log(`Example app listening on port ${PORT}`)
}
);

