const Database = require('../DataBase/index.js')
const Utils = require('../Utils/utils.js')

class User{

    async new( data ){
        let { login,password,email,name,birth } = data;

        let loginExist = await this.getByLogin(login)
        let emailExist = await this.getByEmail(email)

        if( !emailExist ){
            
            if( !loginExist ){
                
                let passwrodCrypt = await Utils.md5(password)

                try{

                    let result = await Database('user').insert({
                        login: login,
                        password: passwrodCrypt,
                        email: email,
                        name: name,
                        birth: birth,
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
                    status:200,
                    mensage: 'Login já cadastrado.'
                }
            }

        }else{
            return {
                    status: 200,
                    mensage: 'Email já cadastrado.'
                };
        }
    }

    async login( data ){

        let { login,password,email,name,birth } = data;

        let loginExist = await this.getByLogin(login)

        if( loginExist ){
            
            let passwrodCrypt = await Utils.md5(password);
            
            try{
                let result = await Database('user').select('').where({
                    login: login,
                    password: password
                }); 

                if( result.lenght > 0 ){
                    return {
                        status: 200,
                        mensage: 'Login efetuado.'
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
            let result = await Database('user').select().where({ login: login })

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
            let result = await Database('user').select().where({ email: email })

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
            let result = Database('user').select().where({ name: name })            
            
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