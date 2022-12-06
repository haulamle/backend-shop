const express = require('express')
const router = express.Router()

const InvoicesDetailControllers = require('../controllers/InvoicesDetailControllers')

router.post('/invoicedetail',InvoicesDetailControllers.add)
router.get('/invoicedetail',InvoicesDetailControllers.getAll)
router.get('/invoicedetail/:id',InvoicesDetailControllers.get)
router.delete('/invoicedetail/:id',InvoicesDetailControllers.delete)
router.put('/invoicedetail/:id',InvoicesDetailControllers.update)


module.exports = router