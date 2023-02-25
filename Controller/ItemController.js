
class ItemController{
    
    async create( req,res ){
        res.send('create')
    }
    
    async delete( req,res ){
        res.send('delete')
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

module.exports = new ItemController()