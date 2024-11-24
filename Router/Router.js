const express = require('express');
var router = express.Router()
const multer = require('multer');

var CompraController = require('../Controller/CompraController')
var UsuarioController = require('../Controller/UsuarioController')
var CartaoController = require('../Controller/CartaoController')

var verificaToken = require('../middleware/verificaToken')

router.get('/usuario', UsuarioController.findAll);
router.get('/usuario/:id', UsuarioController.findById);
router.post('/usuario',UsuarioController.criarUsuario );
router.post('/usuario/acessar', UsuarioController.acessar);
router.put('/usuario/:id', UsuarioController.findById);
router.delete('/usuario/:id', UsuarioController.delete);

router.post('/cartao',verificaToken,CartaoController.gravar);
router.get('/cartao/',verificaToken, CartaoController.recuperar);
router.get('/cartao/listagem',verificaToken, CartaoController.listagem);

router.post('/cartao/compra',verificaToken,CompraController.gravar);
router.get('/cartao/compra/listagem',verificaToken,CompraController.listagem);

module.exports = router;