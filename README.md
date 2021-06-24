для запуска Монго в корне проекта создать файл dev.env
внутри файла указать

MONGO_PASSWORD=password
MONGO_USER=user

DATABASE_URL=postgres://postgres:newPassword@postgres:5432/ya-porto
NODE_ENV=development

после запуска докера локально необходимо удалять все файлы которые Монго запишет в папке mongo