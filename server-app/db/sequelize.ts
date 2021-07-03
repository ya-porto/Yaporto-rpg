import { Sequelize, SequelizeOptions, DataType, Model, Table, Column } from 'sequelize-typescript';

// Задаем параметры для подключения к БД
const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'newPassword',
    database: 'my-db-name',

    dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

const sequelize = new Sequelize(sequelizeOptions);

const UserThemes = sequelize.define('UserThemes', {
    user_id: {
        type: DataType.INTEGER,
        unique: true
    },
    theme_id: DataType.TEXT
})

const Themes = sequelize.define('Themes', {
    theme_id: {
        type: DataType.TEXT,
        unique: true
    },
    theme_name: DataType.TEXT
})

const Threads = sequelize.define('Threads', {
    thread_id: {
        type: DataType.INTEGER,
        unique: true
    },
    author_id: DataType.INTEGER,
    author_info: DataType.TEXT,
    title: DataType.TEXT,
    text: DataType.TEXT
})

const Comments = sequelize.define('Comments', {
    thread_id: {
        type: DataType.INTEGER,
        references: {
            model: 'Threads',
            key: 'thread_id'
        }
    },
    comment_id: {
        type: DataType.INTEGER,
        unique: true,
    },
    author_id: DataType.INTEGER,
    author_info: DataType.TEXT,
    text: DataType.TEXT
})

const Likes = sequelize.define('Likes', {
    comment_id: {
        type: DataType.INTEGER,
        references: {
            model: 'Comments',
            key: 'comment_id'
        }
    },
    author_id: DataType.INTEGER
})



export {sequelize, UserThemes, Themes, Threads, Comments, Likes}