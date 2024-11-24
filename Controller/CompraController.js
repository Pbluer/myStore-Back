var Compra = require('../model/Compra');
const utils = require('../Utils/utils');
const Utils = require('../Utils/utils');

class CompraController {

    async gravar( req, res ) {
        let { codigo, descricao,tipoCompra,cartao,valor,parcela,dataCompra,retroativo } = req.body;

        if (descricao == "" ) {
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Descrição da compra não informado.'
            })
            return;
        }

        if ( tipoCompra == "null" ) {
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Tipo de compra não informado.'
            })
            return;
        }   

        if ( valor == "" ) {
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Valor da compra não informado.'
            })
            return;
        }   
        
        if ( cartao == "" ){
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Cartão não selecionado.'
            })
            return;
        }   
        
        if ( parcela == "" ){
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Parcela não selecionado.'
            })
            return;
        }   

        valor = parcela > 1 ? ( Utils.formatarMoeda(valor) / parcela) : Utils.formatarMoeda(valor);

        if( retroativo == 1 && dataCompra == '' ){
            res.status(400)
            res.json({
                status: 400,
                mensage: 'Data da compra não informado.'
            })
            return;
        }

        dataCompra = retroativo == 1 && dataCompra !== '' ? Utils.formataDataSql(dataCompra) : dataCompra = Utils.getDateTimeSql(dataCompra)

        if (codigo == 0) {
            
            var response = await Compra.cadastro({
                descricao: Utils.formataString(descricao),
                valor: valor,
                divisao: Utils.formataNumero(parcela),
                cartao: Utils.formataNumero(cartao),
                dataCompra:dataCompra,
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
}   

module.exports = new CompraController()