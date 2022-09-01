const Product = require('./productModel')

exports.getAllProducts = async () => {
    try {
        const data = await Product.findAll()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

exports.getProductById = async (id) => {
    try {
        const data = await Product.findAll({ where: { id: id } })
        if (!data) throw new Error("No product found")
        return data[0]
    } catch (error) {
        throw new Error(error)
    }
}

exports.addNewProduct = async (name, description, image) => {
    try {
        const data = await Product.findAll({
            where: {
                name: name
            }
        })
        if (data.length) {
            throw new Error("Product is already stored in the database")
        }
        const result = await Product.create({
            name: name,
            description: description,
            image: image
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}