const db = require('../../db/db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,]
        },
        get() {
            return this.getDataValue("name")
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,]
        },
        get() {
            return this.getDataValue("description")
        }
    },
    image: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue("image")
        }
    }
}, {
    timestamps: true
});

module.exports = Product;