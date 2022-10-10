const express = require('express')
const router = express.Router()

const CategorysControllers = require('../controllers/CategorysControllers')

router.post('/category',CategorysControllers.add)
router.get('/category',CategorysControllers.getAll)
router.get('/category/:id',CategorysControllers.get)
router.delete('/category/:id',CategorysControllers.delete)
router.put('/category/:id',CategorysControllers.update)


module.exports = router