var Cartao = require('../model/Cartao');
var Compra = require('../model/Compra');
const Utils = require('../Utils/utils');

class CartaoController {

    async gravar(req, res ) {
        let { codigo, descricao,limite, ativo } = req.body;

        if (descricao == undefined || descricao == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá a descrição.'
            })
            return;
        }

        if (limite == undefined || limite == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá o limite do cartão.'
            })
            return;
        }   

        if (codigo == 0) {
            var response = await Cartao.cadastro({
                descricao: Utils.formataString(descricao),
                limite: Utils.formatarMoeda(limite),
                usuario: res.locals.codigoUsuario,
                ativo: Utils.formataNumero(ativo)
            });
        } else {
            var response = await Cartao.atualizar({
                codigo: Utils.formataNumero(codigo),
                descricao: Utils.formataString(descricao),
                limite: Utils.formatarMoeda(limite),
                usuario: res.locals.codigoUsuario,
                ativo: Utils.formataNumero(ativo)
            });
        }

        res.status(response.status)
        res.json(response)
    }

    async recuperar(req, res) {
        let { codigo } = req.body;

        if (codigo == undefined || codigo == "null" || codigo == 0) {
            res.json({
                status: 400,
                mensage: 'Código não informado.'
            })
            return;
        }

        let response = await Cartao.acessar(req.body);

        res.status(response.status)
        res.json(response)
    }

    async deletar(req, res) {
        res.send('remove')
    }

    async listagem(req, res ){
        let response = await Cartao.buscarTodos(res.locals.codigoUsuario);

        res.status(response.status)
        res.json(response)
    }
}   

module.exports = new CartaoController()