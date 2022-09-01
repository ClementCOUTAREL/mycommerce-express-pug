exports.getHomePage = ((req, res, next) => {
    res.status(200).render("home", { isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin })
})