var User = require('../model/User');
const utils = require('../Utils/utils');
class UserController{
    
    async create( req,res ){
        let { path,mimetype } = req.file;
        let { login,password,email,foto } = req.body;
        
        var image = await utils.imageBase64(path,mimetype);

        if( login == undefined || login == "" ){
            res.json({ 
                status: 400,
                err: 'Login não informado.'
            })
            return;
        }
        
        if( email == undefined || email == "" ){
            res.json({ 
                status: 400,
                err: 'Email não informado.'
            })            
            return;
        }
        
        if( password == undefined || password  == ""){
            res.json({ 
                status: 400,
                err: 'Senha não informada'
            })
            return;
        }
        
        let response =  await User.new( req.body );        
        res.json(response)
    }
    
    async login( req,res ){
        let { login,password,email,name,birth } = req.body;
        
        if( login == undefined || login == "" ){
            res.json({ 
                status: 400,
                mensage: 'Login não informado.'
            })
            return;
        }
        
        if( password == undefined || password  == ""){
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