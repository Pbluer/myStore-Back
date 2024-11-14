const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class User{

    async cadastro({ descricao, ativo }) {

        try {

            await Database('cartao').insert({
                descricao: descricao,
                ativo: ativo
            })

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

    async atualizar({ codigo,descricao, ativo }) {

        try {

            await Database('cartao').update({
                descricao: descricao,
                ativo: ativo
            }).where({ codigo: codigo })

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

    async remove(req,res){
    }

    async getByEmail( email ) {

        try{
            let result = await Database('usuario').select().where({ email: email })
            
            if( result.length ){
                return result
            }else{
                false;
            }

        }catch( err ){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    }

    async getByName( name ) {

        try{
            let result = Database('usuario').select().where({ name: name })            
            
            if( result.length > 0 ){
                return result
            }else{
                false;
            }

        }catch( err ){
            console.log(err)
        }
    }

    async update(req,res){

    }

}

module.exports = new User()