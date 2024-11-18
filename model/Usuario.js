const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class User{

    async cadastro( { email,senha,nome,sobrenome } ){

        if( !await this.getByEmail(email)){           
           
            let senhaCrypt = await Utils.md5(senha)

            try{                  
                                    
                await Database('usuario').insert({
                    email: email,
                    senha: senhaCrypt,
                    nome: nome,
                    sobrenome: sobrenome
                })

                return {
                    status: 200,
                    mensage: 'Operação realizada.'
                }

            }catch( err ){

                return {
                    status: 400,
                    mensage: err.sqlMessage
                }
            }

        }else{
            return {
                    status: 400,
                    mensage: 'Email já cadastrado.'
                };
        }
    }

    async acessar( { email,senha } ){
        if( await this.getByEmail(email) ){

            let senhaCrypt = await Utils.md5(senha);
            try{
                let result = await Database('usuario').select('').where({
                    email: email,
                    senha: senhaCrypt
                }); 
                
                if( result.length > 0 ){
                    let { codigo,nome,email } = result[0];

                    let token = await Utils.tokenUsuario({
                        codigo: codigo,
                        email: email
                    });
                 
                    return {
                        status: 200,
                        mensage: 'Operação realizada.',
                        data:{
                            token: token,
                            codigo: codigo,
                            nome: nome
                        }
                    }
                }else{
                    return {
                        status: 400,
                        mensage: 'Senha incorreta.'
                    }
                }

            }catch( err ){
                console.log(err)
            }

        }else{
            return {
                status: 403,
                mensage: 'Usuário não existe ou incorreto.'
            };
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


}

module.exports = new User()