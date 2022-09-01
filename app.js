const express = require('express');
const loaders = require('./loaders/index')
const path = require('path');
const db = require('./db/db')

const { notFound } = require('./middlewares/notFound')
const { errorHandler } = require('./middlewares/errorHandler')
const { checkSession } = require('./middlewares/checkSession')

const app = express();

loaders(app)

app.use(express.static(path.join(__dirname, 'assets')))
app.use('*/images', express.static(path.join(__dirname, 'assets/images')))

const router = require('./routes/index')
app.use("/shop", checkSession, router)

app.use(notFound)
app.use(errorHandler)




db.sync()
    .then(result => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Listening on port " + process.env.PORT)
        });

    })

