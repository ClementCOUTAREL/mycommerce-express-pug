exports.checkIsAdmin = (req, res, next) => {
    if (req.user === undefined) return res.status(404).redirect('/shop/products')
    if (req.user.isAdmin === undefined) return res.status(404).redirect('/shop/products')
    next()
}