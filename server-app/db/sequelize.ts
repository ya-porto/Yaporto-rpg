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




export {sequelize, UserThemes, Themes}