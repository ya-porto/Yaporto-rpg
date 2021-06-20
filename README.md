для запуска Монго в корне проекта создать файл dev.env
внутри файла указать

MONGO_PASSWORD=password
MONGO_USER=user

DATABASE_URL=postgres://postgres:newPassword@postgres:5432/my-db-name
NODE_ENV=development
PORT=5000 

после запуска докера локально необходимо удалять все файлы которые Монго запишет в папке mongo