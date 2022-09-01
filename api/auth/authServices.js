const User = require('./userModel')

exports.registerNewUser = async (email, username, password) => {
    try {
        const result = await User.findAll({
            where: {
                email: email
            }
        })
        if (result.length) throw new Error('User already registered with the email provided')
        const user = await User.create({
            email: email,
            username: username,
            password: password
        })
        if (user) return true
    } catch (error) {
        throw new Error(error)
    }
}

exports.findUser = async (email) => {
    try {
        const result = await User.findAll({
            where: {
                email: email
            }
        })
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}