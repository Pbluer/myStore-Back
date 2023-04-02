const express = require('express');
var router = express.Router()
const multer = require('multer');
var upload = multer({ dest: './uploads/' })

var ItemController = require('../Controller/ItemController')
var UserController = require('../Controller/UserController')

router.get('/item', ItemController.findAll)
router.get('/item/:id', ItemController.findById)
router.post('/item', ItemController.create)
router.put('/item/:id', ItemController.editItem)
router.delete('/item/:id', ItemController.delete)
        
router.get('/user', UserController.findAll)
router.get('/user/:id', UserController.findById)
router.post('/user', upload.single('foto'), UserController.create )
router.post('/user/login', UserController.login)
router.put('/user/:id', UserController.findById)
router.delete('/user/:id', UserController.delete)
module.exports = router;