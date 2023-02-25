const express = require('express');
var router = express.Router()

var ItemController = require('../Controller/ItemController')
var UserController = require('../Controller/UserController')

router.get('/itens', ItemController.findAll)
router.get('/itens/:id', ItemController.findById)
router.post('/itens', ItemController.create)
router.put('/itens/:id', ItemController.findById)
router.delete('/itens/:id', ItemController.delete)

router.get('/user', UserController.create)

module.exports = router;