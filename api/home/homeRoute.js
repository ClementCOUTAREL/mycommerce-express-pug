const router = require('express').Router()
const HomeController = require('./homeController')

router.get("/", HomeController.getHomePage)

module.exports = router