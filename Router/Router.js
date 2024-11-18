const express = require('express');
var router = express.Router()
const multer = require('multer');

var ComprasController = require('../Controller/ComprasController')
var UsuarioController = require('../Controller/UsuarioController')
var CartaoController = require('../Controller/CartaoController')

var verificaToken = require('../middleware/verificaToken')

router.get('/usuario', UsuarioController.findAll);
router.get('/usuario/:id', UsuarioController.findById);
router.post('/usuario',UsuarioController.criarUsuario );
router.post('/usuario/acessar', UsuarioController.acessar);
router.put('/usuario/:id', UsuarioController.findById);
router.delete('/usuario/:id', UsuarioController.delete);

router.post('/cartao', CartaoController.gravar);
router.get('/cartao/', CartaoController.recuperar);
router.get('/cartao/listagem',verificaToken, CartaoController.listagem);

router.post('/compras', ComprasController.gravar);

module.exports = router;    