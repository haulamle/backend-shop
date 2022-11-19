const express = require('express')
const router = express.Router()

const RatesControllers = require('../controllers/RatesControllers')

router.post('/rate',RatesControllers.add)
router.get('/rate',RatesControllers.getAll)
router.get('/rate/:id',RatesControllers.get)
router.delete('/rate/:id',RatesControllers.delete)
router.put('/rate/:id',RatesControllers.update)


module.exports = router