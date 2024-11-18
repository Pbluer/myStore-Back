var Compras = require('../model/Compras');
const utils = require('../Utils/utils');
const Utils = require('../Utils/utils');

class ComprasController {

    async gravar(req, res) {
        let { codigo, descricao,quantidade,valor,parcela } = req.body;

        if (descricao == undefined || descricao == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá a descrição.'
            })
            return;
        }

        if (quantidade == undefined || quantidade == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá o limite do cartão.'
            })
            return;
        }   

        if (valor == undefined || valor == "null") {
            res.json({
                status: 400,
                mensage: 'Insirá o limite do cartão.'
            })
            return;
        }   
      
        if (codigo == 0) {
            var response = await Compras.cadastro({
                descricao: Utils.formataString(descricao),
                limite: utils.formatarMoeda(limite),
                ativo: Utils.formataNumero(ativo)
            });
        } else {
            var response = await Compras.atualizar({
                codigo: Utils.formataNumero(codigo),
                descricao: Utils.formataString(descricao),
                limite: utils.formatarMoeda(limite),
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

        let response = await Compras.acessar(req.body);
        res.json(response)
    }

    async deletar(req, res) {
        res.send('remove')
    }

    async listagem(req, res) {
        let response = await Compras.buscarTodos(req.body);
        res.json(response)
    }
}

module.exports = new ComprasController()