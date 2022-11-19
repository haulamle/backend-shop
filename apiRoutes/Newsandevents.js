const express = require('express')
const router = express.Router()

const NewsandeventsController = require('../controllers/NewsandeventsController')

router.post('/newsandevent',NewsandeventsController.add)
router.get('/newsandevent',NewsandeventsController.getAll)
router.get('/newsandevent/:id',NewsandeventsController.get)
router.delete('/newsandevent/:id',NewsandeventsController.delete)
router.put('/newsandevent/:id',NewsandeventsController.update)


module.exports = router