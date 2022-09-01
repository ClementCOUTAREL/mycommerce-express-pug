const router = require('express').Router()
const productsController = require('./productsController')
const { checkIsAdmin } = require('../../middlewares/checkIsAdmin')

router.post("/delete/:id", productsController.deleteProduct)
router.get("/edit/:id", checkIsAdmin, productsController.getEditProductPage)
router.post("/edit/:id", productsController.editProduct)
router.get("/add", checkIsAdmin, productsController.getAddProductPage)
router.post("/add", productsController.addProduct)
router.get("/", productsController.getProductsListPage)

module.exports = router