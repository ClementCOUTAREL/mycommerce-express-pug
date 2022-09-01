const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const multer = require('multer')
const csrf = require('csurf')
const session = require('express-session')
const { v4 } = require('uuid');
const sequelize = require('../db/db')
require('dotenv').config()

console.log(process.env.DB_NAME)

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const csrfProtection = csrf()

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images")
    },
    filename: (req, file, cb) => {
        cb(null, v4() + "-" + file.originalname)
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' | file.mimetype === 'image/jpg' | file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }

}

const loaders = async (app) => {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(morgan('tiny'))
    app.use(helmet())
    app.set('view engine', 'pug')
    app.set('views', 'views')
    app.use(multer({ storage: filestorage }, { filefilter: filefilter }).single('image'))
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
            expiration: 24 * 60 * 60 * 1000,
            db: sequelize
        }),
        resave: false,
        saveUninitialized: false,
    }))
    app.use(csrfProtection)

    sequelize.authenticate().then(() => {
        console.log("DB connected")
    })
}

module.exports = loaders