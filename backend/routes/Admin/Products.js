const express = require('express')

const {addProduct, fetchAllProducts} = require('../../controllers/Admin/Product')
const router = express.Router()

router.post('/addProduct',  addProduct)
router.get('/fetchProducts',  fetchAllProducts)
module.exports = router

