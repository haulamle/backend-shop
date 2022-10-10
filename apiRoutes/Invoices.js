const express = require('express')
const router = express.Router()

const InvoicesControllers = require('../controllers/InvoicesControllers')

router.post('/invoice',InvoicesControllers.add)
router.get('/invoice',InvoicesControllers.getAll)
router.get('/invoice/:id',InvoicesControllers.get)
router.delete('/invoice/:id',InvoicesControllers.delete)
router.put('/invoice/:id',InvoicesControllers.update)


module.exports = router