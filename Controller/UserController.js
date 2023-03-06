var User = require('../model/User')
class UserController{
    
    async create( req,res ){
        let { nome,email,password } = req.body;
        
        if( nome == undefined ){
            res.json({ err: 'O nome não foi inserido.' })
            res.sendStatus(400)
            return
        }
        
        if( email == undefined ){
            res.sendStatus(400)
            res.json({ err: 'O email não foi inserido.' })
            return
        }
        
        if( password == undefined ){
            res.sendStatus(400)
            res.json({ err: 'A senha não foi inserida.' })
            return
        }
        
        let response =  await User.new( req.body );
        
        if( response.status == 200 ){
            res.sendStatus(res.status)
        }else{
            res.json( response )
        }
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