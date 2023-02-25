
class UserController{
    
    async create( req,res ){
        res.send('create')
    }
    
    async remove( req,res ){
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