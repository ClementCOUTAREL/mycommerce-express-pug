exports.errorHandler = ((err, req, res, next) => {
    console.log("Final error log")
    console.log(err.message)
    return res.status(500).render("errorPage", { error: err.message })
})