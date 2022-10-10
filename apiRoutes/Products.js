const express = require('express')
const router = express.Router()

const ProductsControllers = require('../controllers/ProductsControllers')

router.post('/product',ProductsControllers.add)
router.get('/product',ProductsControllers.getAll)
router.get('/product/:id',ProductsControllers.get)
router.get('/product/catogory/:id',ProductsControllers.getDm)
router.delete('/product/:id',ProductsControllers.delete)
router.put('/product/:id',ProductsControllers.update)


module.exports = router