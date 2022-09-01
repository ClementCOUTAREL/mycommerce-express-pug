const bcrypt = require('bcrypt')
const { registerNewUser, findUser } = require('./authServices')

exports.getLoginPage = ((req, res, next) => {
    res.status(200).render("login", { isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin })
})

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await findUser(email.trim())
        if (user === undefined) throw new Error('User not found with the email provided')
        const test = await bcrypt.compare(password, user.getDataValue("password"))
        if (!test) throw new Error('Invalid password')
        req.session.isLoggedIn = true
        req.session.user = user
        return res.redirect('/shop/products')
    } catch (error) {
        next(error)
    }
}

exports.getRegisterPage = ((req, res, next) => {
    res.status(200).render("register", { isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin })
})

exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password, confirmPassword } = req.body
        if (password.trim() !== confirmPassword.trim()) throw new Error('Passwords dont match')
        const hashed = await bcrypt.hash(password, 10)
        const result = await registerNewUser(email, username, hashed)
        if (result) res.status(201).redirect("/shop/auth/login")
    } catch (error) {
        next(error)
    }
}

exports.logoutUser = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            req.user = { isAdmin: null }
            if (err) next(err)
            return res.redirect('/shop/auth/login')
        })
    } catch (error) {
        next(error)
    }
}