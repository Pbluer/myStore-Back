const express = require('express');
var router = express.Router()
const multer = require('multer');

var ItemController = require('../Controller/ItemController')
var UsuarioController = require('../Controller/UsuarioController')

router.get('/item', ItemController.findAll)
router.get('/item/:id', ItemController.findById)
router.post('/item', ItemController.create)
router.put('/item/:id', ItemController.editItem)
router.delete('/item/:id', ItemController.delete)
        
router.get('/usuario', UsuarioController.findAll)
router.get('/usuario/:id', UsuarioController.findById)
router.post('/usuario',UsuarioController.criarUsuario )
router.post('/usuario/login', UsuarioController.login)
router.put('/usuario/:id', UsuarioController.findById)
router.delete('/usuario/:id', UsuarioController.delete)

module.exports = router;    