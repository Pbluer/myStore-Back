const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class Compra{

    async cadastro({ descricao,valor,divisao,cartao,dataCompra,usuario }) {

        try {
            
            for( let parcela= 1; parcela <= divisao; parcela++ ){
                let fatura = (new Date(new Date().setMonth( new Date().getMonth() + (parcela -1) )).getMonth());
                
                let result = await Database('compras').insert({
                    descricao: descricao,
                    valor: valor,
                    cartao: cartao,
                    parcela: parcela,
                    divisao: divisao,
                    fatura: fatura,
                    dataCompra:dataCompra,
                    usuario: usuario,
                    dataCadastro: new Date()
                })
            }
            
            return {
                status: 200,
                mensage: 'Operação realizada.'
            }
            
        } catch (err) {
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }
    }

    async atualizar({ codigo,descricao,cartao,valor,parcela,usuario}) {

        try {

            let result = await Database('compras').update({
                descricao: descricao,
                cartao: cartao,
                valor: valor,
                parcela: parcela,
                dataAlteracao: new Date()
            }).where({ codigo: codigo, usuario: usuario })
            
            if( result > 0 ){
                return {
                    status: 200,
                    mensage: 'Operação realizada.'
                }
            }else{
                return {
                    status: 400,
                    mensage: 'Operação não realizada.'
                }
            }
            
        } catch (err) {
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }

    }

    async recuperar({ codigo }) {
        try {
            let result = await Database('usuario').select('descricao', 'ativo').where({ codigo: codigo });

            if (result.length > 0) {
                let { descricao,ativo } = result[0];
                return {
                    status: 200,
                    mensage: 'Operação realizada.',
                    data: {
                        descricao: descricao,
                        ativo: ativo
                    }
                }
            } else {
                return {
                    status: 400,
                    mensage: 'Senha incorreta.'
                }
            }

        } catch (err) {
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }

    }

    async buscarTodos(usuario) {
        try {
            let result = await Database('compras').select('codigo','descricao','parcela','valor','usuario')
                .where({ usuario: usuario})
                .leftJoin('cartao','cartao.codigo','compras.codigo').toString();
            return {
                status: 200,
                mensage: 'Operação realizada.',
                data: result
            }
        } catch (err) {
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }

    }

}

module.exports = new Compra()