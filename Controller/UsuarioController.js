var Usuario = require('../model/Usuario');
const utils = require('../Utils/utils');
class UserController{
    
    async criarUsuario( req,res ){  
        console.log(req)
        return
        let { email,senha,confirmaSenha,nome,sobrenome } = req.body;
        if( email == undefined || email == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Email não informado.'
            })
            return;
        }

        if( (senha == undefined || senha == "null" ) || confirmaSenha == undefined || confirmaSenha  == "null"){
            res.json({ 
                status: 400,
                mensage: 'Senha não informado.'
            })
            return;
        }

        if( senha != confirmaSenha ){
            res.json({ 
                status: 400,
                mensage: 'A senhas não são iguais.'
            })
            return;
        }
        
        let response =  await Usuario.cadastro( req.body );        
        res.json(response)
    }
    
    async login( req,res ){
        let { login,password } = req.body;
        
        if( login == undefined || login == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Login não informado.'
            })
            return;
        }
        
        if( password == undefined || password  == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Senha não informado.'
            })
            
            return;
        }
        
        let response =  await User.login( req.body );        
        res.json(response)
    }
    
    async delete( req,res ){
        res.send('remove')
    }

    async findById( req,res ){
        res.send('findById')
    }

    async findAll( req,res ){
        res.send('findAll')
    }

    async editItem( req,res ){
        res.send('editItem')
    }

}

module.exports = new UserController()