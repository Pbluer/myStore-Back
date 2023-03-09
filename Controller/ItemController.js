var Item = require('../model/Item');
class ItemController {
  async create(req, res) {
    let { name, price, size,type } = req.body;

    if( !name ){
        res.json({ 
            err: 'É necessário inserir um nome.',
            status: 403
        });
        return
    }

    if( !price ){
        res.json({ 
            err: 'É necessário inserir um preço.',
            status: 403
        });
        return
    }

    if( !size ){
        res.json({ 
            err: 'É necessário inserir um tamanho.',
            status: 403
        });
        return
    }

    let result = await Item.new( req.body )
    
    res.json(result)
  }

  async delete(req, res) {
    res.send("delete");
  }

  async findById(req, res) {
    res.send("findById");
  }

  async findAll(req, res) {
    let result = await Item.getAll();
    
    if( result ){
      res.status(200)
      res.json(result);
    }else{
      res.status(result.status)
      res.json(result.err)
    }

    return;
  }

  async editItem(req, res) {
    res.send("editItem");
  }
}

module.exports = new ItemController();
