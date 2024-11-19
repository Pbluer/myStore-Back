var Compra = require('../model/Compra');
const Utils = require('../Utils/utils');

class CompraController {

    async recuperar( req, res) {
        let { codigo } = req.body;

        if (codigo == undefined || codigo == "null" || codigo == 0) {
            res.json({
                status: 400,
                mensage: 'Código não informado.'
            })
            return;
        }

        let response = await Compra.acessar(req.body);

        res.status(response.status)
        res.json(response)
    }

    async deletar( req, res) {
        res.send('remove')
    }

    async listagem( req, res ){
        let response = await Compra.buscarTodos(res.locals.codigoUsuario);

        res.status(response.status)
        res.json(response)
    }

    async gravar( req, res ) {
        console.log(1111111)
        let { codigo, descricao,tipo,Compra,valor } = req.body;

        if (descricao == undefined || descricao == "null") {
            res.json({
                status: 400,
                mensage: 'Descrição da compra não informado.'
            })
            return;
        }

        if (tipo == undefined || tipo == "null") {
            res.json({
                status: 400,
                mensage: 'Tipo de compra não informado.'
            })
            return;
        }   

        if (valor == undefined || valor == "null") {
            res.json({
                status: 400,
                mensage: 'Valor da compra não informado.'
            })
            return;
        }   
        
        if (Compra == undefined || Compra == "null") {
            res.json({
                status: 400,
                mensage: 'Cartão não selecionado.'
            })
            return;
        }   

        if (codigo == 0) {
            var response = await Compra.gravar({
                descricao: Utils.formataString(descricao),
                valor: Utils.formatarMoeda(valor),
                tipo: Utils.formataNumero(tipo),
                usuario: res.locals.codigoUsuario
            });
        } else {
            var response = await Compra.atualizar({
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
}   

module.exports = new CompraController()