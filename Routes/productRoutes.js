const express = require('express')
const router = express.Router()


const productController = require('../Controllers/products')

router.get('/',productController.GETProducts)
router.post('/',productController.POSTProducts)


module.exports = router

