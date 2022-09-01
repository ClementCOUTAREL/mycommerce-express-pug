exports.checkSession = (req, res, next) => {
    if (req.user && req.isLoggedIn) return
    if (req.session) {
        const { user, isLoggedIn } = req.session
        req.user = user
        req.isLoggedIn = isLoggedIn
        if (req.user === undefined) req.isAdmin = false;
        else req.isAdmin = req.user.isAdmin
    }
    next()
}