const Product = require('./productModel')
const { getAllProducts, getProductById, addNewProduct } = require('./productsServices')

exports.getProductsListPage = async (req, res, next) => {
    try {
        const data = await getAllProducts()
        console.log(data)
        res.status(200).render("products-list", { products: data, isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin })
    } catch (error) {
        next(error)
    }
}

exports.getAddProductPage = (req, res, next) => {
    res.status(200).render("addProduct", { isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin })
}

exports.addProduct = async (req, res, next) => {
    try {
        const { name, description } = req.body
        const image = req.file
        const result = await addNewProduct(name, description, image.path)
        if (result) return res.status(201).redirect("/shop/products")
    } catch (error) {
        next(error)
    }

}

exports.getEditProductPage = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await getProductById(id)
        console.log(product.getDataValue("image"));
        res.status(200).render("editProduct", { isLoggedIn: req.isLoggedIn, csrf: req.csrfToken(), isAdmin: req.isAdmin, productId: id, productName: product.getDataValue('name'), productDescription: product.getDataValue('description'), productImage: product.getDataValue('image') })
    } catch (error) {
        next(error)
    }

}

exports.editProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description } = req.body
        const image = req.file
        const product = await getProductById(id)
        await product.update({ name: name, description: description, image: image.path }, { where: { id: id } })
        await product.save()
        return res.status(201).redirect("/shop/products")

    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        await Product.destroy({ where: { id: id } })
        return res.redirect('/shop/products')
    } catch (error) {
        next(error)
    }
}