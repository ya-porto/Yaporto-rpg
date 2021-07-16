import { Sequelize, SequelizeOptions, DataType, Model, Table, Column } from 'sequelize-typescript';


// Задаем параметры для подключения к БД
const sequelizeOptions: SequelizeOptions = {
    host: 'postgres',
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
        unique: true,
    },
    theme_id: DataType.TEXT
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

const Themes = sequelize.define('Themes', {
    theme_id: {
        type: DataType.TEXT,
        unique: true
    },
    theme_name: DataType.TEXT
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

const Threads = sequelize.define('Threads', {
    thread_id: {
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: DataType.TEXT,
    text: DataType.TEXT
}, {
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

const Comments = sequelize.define('Comments', {
    comment_id: {
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    text: DataType.TEXT
}, {
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

const Comment = Threads.hasMany(Comments, {
    as: 'comments',
    foreignKey: 'thread_id'
})



const Likes = sequelize.define('Likes', {
}, {
    underscored: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

const Like = Comments.hasMany(Likes, {
    as: 'likes',
    foreignKey: 'comment_id'
})

const Users = sequelize.define('Users', {
    user_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    user_info: DataType.STRING
}, {
    createdAt: false,
    updatedAt: false
})
Comments.belongsTo(Users, {
    foreignKey: 'user_id'
})
Likes.belongsTo(Users, {
    foreignKey: 'user_id'
})
Threads.belongsTo(Users, {
    foreignKey: 'user_id'
})


export {sequelize, UserThemes, Themes, Threads, Comments, Likes, Users, Comment, Like}