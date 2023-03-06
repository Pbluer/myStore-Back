const express = require('express');
var router = express.Router()

var ItemController = require('../Controller/ItemController')
var UserController = require('../Controller/UserController')

router.get('/item', ItemController.findAll)
router.get('/item/:id', ItemController.findById)
router.post('/item', ItemController.create)
router.put('/item/:id', ItemController.findById)
router.delete('/item/:id', ItemController.delete)

router.get('/user', UserController.findAll)
router.get('/user/:id', UserController.findById)
router.post('/user', UserController.create)
router.put('/user/:id', UserController.findById)
router.delete('/user/:id', UserController.delete)
module.exports = router;