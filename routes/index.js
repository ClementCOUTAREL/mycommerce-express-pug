const express = require('express')

const router = express.Router()
const HomeRoute = require('../api/home/homeRoute')
const productsRoutes = require('../api/products/productsRoutes')
const authRoutes = require('../api/auth/authRoutes')

router.use('/products', productsRoutes)
router.use('/auth', authRoutes)
router.use('/', HomeRoute)

module.exports = router