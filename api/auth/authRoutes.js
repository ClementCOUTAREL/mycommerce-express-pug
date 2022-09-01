const router = require('express').Router()
const authController = require('./authController')

router.post("/login", authController.loginUser)
router.get("/login", authController.getLoginPage)
router.post("/register", authController.registerUser)
router.get("/register", authController.getRegisterPage)
router.post("/logout", authController.logoutUser)

module.exports = router