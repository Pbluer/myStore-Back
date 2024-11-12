var Usuario = require('../model/Usuario');
const utils = require('../Utils/utils');
class UserController{
    
    async criarUsuario( req,res ){ 
        let { email,senha,confirmarSenha } = req.body;

        if( email == undefined || email == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Email não informado.'
            })
            return;
        }

        if( (senha == undefined || senha == "null" ) || confirmarSenha == undefined || confirmarSenha  == "null"){
            res.json({ 
                status: 400,
                mensage: 'Senha não informado.'
            })
            return;
        }

        if( senha != confirmarSenha ){
            res.json({ 
                status: 400,
                mensage: 'As senhas precisam ser iguais.'
            })
            return;
        }
        
        let response =  await Usuario.cadastro( req.body );        
        res.json(response)
    }
    
    async acessar( req,res ){
        let { email,senha } = req.body;
        if( email == undefined || email == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Email não informado.'
            })
            return;
        }
        
        if( senha == undefined || senha  == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Senha não informada.'
            })            
            return;
        }
        
        let response =  await Usuario.acessar( req.body );        
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