const Sequelize = require('sequelize')
const config = require('./config')



console.log(config)

module.exports = new Sequelize(config.name, config.username, config.password, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})