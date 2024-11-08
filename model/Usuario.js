const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class User{

    async cadastro( { email,senha,name,foto } ){

        let loginExist = await this.getByLogin(login);
        let emailExist = await this.getByEmail(email);

        if( !emailExist ){
            
            if( !loginExist ){
                
                let passwrodCrypt = await Utils.md5(password)

                let token = await Utils.md5( Math.random() + '-' + ( new Date().getTime() )  + '-' + login );
                try{                  
                                        
                    let result = await Database('usuario').insert({
                        login: login,
                        password: passwrodCrypt,
                        email: email,
                        name: name,
                        foto: foto
                    })

                    let id = result[0];
                            
                    await Database('user_token').insert({
                        id:id,
                        token:token
                    })
                   
                    return{
                        status: 200,
                        mensage: 'Usuário cadastrado.'
                    }

                }catch( err ){

                    return {
                        status: 400,
                        mensage: err.sqlMessage
                    }
                }

            }else{
                return {
                    status:400,
                    mensage: 'Login já cadastrado.'
                }
            }

        }else{
            return {
                    status: 400,
                    mensage: 'Email já cadastrado.'
                };
        }
    }

    async login( data ){

        let { login,password } = data;

        let loginExist = await this.getByLogin(login)

        if( loginExist ){

            let passwrodCrypt = await Utils.md5(password);
            
            try{
                let result = await Database('usuario').select('').where({
                    login: login,
                    password: passwrodCrypt
                }); 

                let token = await Utils.tokenLogin(login);

                if( result.length > 0 ){ 
                    return {
                        status: 200,
                        mensage: 'Login efetuado.',
                        token: token
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

    async getByLogin( login ) {

        try{
            let result = await Database('usuario').select().where({ login: login })

            if( result.length > 0 ){
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

    async getByEmail( email ) {

        try{
            let result = await Database('usuario').select().where({ email: email })

            if( result.length ){
                return reuslt
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