var Cartao = require('../model/Cartao');
const Utils = require('../Utils/utils');

class CartaoController {

    async gravar(req, res) {
        let { codigo, descricao, ativo } = req.body;

        if (descricao == undefined || descricao == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá a descrição.'
            })
            return;
        }
      
        if (codigo == 0) {
            var response = await Cartao.cadastro({
                descricao: Utils.formataString(descricao),
                ativo: Utils.formataNumero(ativo)
            });
        } else {
            var response = await Cartao.atualizar({
                codigo: Utils.formataNumero(codigo),
                descricao: Utils.formataString(descricao),
                ativo: Utils.formataNumero(ativo)
            });
        }

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
        res.json(response)
    }

    async deletar(req, res) {
        res.send('remove')
    }

    async listagem(req, res) {
        let response = await Cartao.buscarTodos(req.body);
        res.json(response)
    }
}

module.exports = new CartaoController()