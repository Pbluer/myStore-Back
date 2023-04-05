var User = require('../model/User');
const utils = require('../Utils/utils');
class UserController{
    
    async create( req,res ){
        if( req.file ){
            let { path,mimetype } = req.file;
            req.body.foto = await utils.imageBase64(path,mimetype);
        }

        let { login,password,email } = req.body;

        if( email == undefined || email == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Email não informado.'
            })
            return;
        }

        if( login == undefined || login == "null" ){
            res.json({ 
                status: 400,
                mensage: 'Login não informado.'
            })
            return;
        }

        if( password == undefined || password  == "null"){
            res.json({ 
                status: 400,
                mensage: 'Senha não informada'
            })
            return;
        }
        
        let response =  await User.new( req.body );        
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