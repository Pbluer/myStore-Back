const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class User{

    async cadastro({ descricao,limite,usuario, ativo }) {

        try {

            let result = await Database('cartao').insert({
                descricao: descricao,
                limite: limite,
                usuario: usuario,
                ativo: ativo                
            })
            
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

    async atualizar({ codigo,descricao,limite,usuario, ativo }) {

        try {

            let result = await Database('cartao').update({
                descricao: descricao,
                limite: limite,
                ativo: ativo,
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
            let result = await Database('cartao').select('codigo','descricao','ativo','limite','usuario').where({ usuario: usuario });
            return {
                status: 200,
                mensage: 'Operação realizada.',
                data: result
            }
            console.log(result)
        } catch (err) {
            console.log(err)
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }

    }

}

module.exports = new User()