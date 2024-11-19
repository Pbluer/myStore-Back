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
        let { codigo, descricao,tipo,cartao,valor,divisao } = req.body;

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
        
        if (cartao == undefined || cartao == "null") {
            res.json({
                status: 400,
                mensage: 'Cartão não selecionado.'
            })
            return;
        }   
        
        if (divisao == undefined || divisao == "null") {
            res.json({
                status: 400,
                mensage: 'divisao não selecionado.'
            })
            return;
        }   

        if( divisao > 1 ){
            valor =  Utils.formatarMoeda(valor) / divisao;
        }

        if (codigo == 0) {
            
            var response = await Compra.cadastro({
                descricao: Utils.formataString(descricao),
                valor: valor,
                divisao: Utils.formataNumero(divisao),
                cartao: Utils.formataNumero(cartao),
                usuario: res.locals.codigoUsuario
            });

        } else {
            var response = await Compra.atualizar({
                codigo: Utils.formataNumero(codigo),
                descricao: Utils.formataString(descricao),
                valor: Utils.formatarMoeda(valor),
                divisao: Utils.formataNumero(divisao),
                cartao: Utils.formataNumero(cartao),
                usuario: res.locals.codigoUsuario
            });
        }

        res.status(response.status)
        res.json(response)
    }
}   

module.exports = new CompraController()