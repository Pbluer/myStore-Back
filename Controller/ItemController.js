var Item = require('../model/Item');
class ItemController {
  async create(req, res) {
    let { nome, preco, descricao, tamanho, tecido, modelo } = req.body;

    if( !nome ){
        res.json({ 
            err: 'É necessário inserir um nome.',
            status: 403
        });
        return
    }

    if( !preco ){
        res.json({ 
            err: 'É necessário inserir um preço.',
            status: 403
        });
        return
    }
    
    if( !descricao ){
        res.json({ 
            err: 'É necessário inserir uma descrição.',
            status: 403
        });
        return
    }

    if( !tamanho ){
        res.json({ 
            err: 'É necessário inserir um tamanho.',
            status: 403
        });
        return
    }

    let result = await Item.new( req.body )
    res.send("create");
  }

  async delete(req, res) {
    res.send("delete");
  }

  async findById(req, res) {
    res.send("findById");
  }

  async findAll(req, res) {
    res.send("findAll");
  }

  async editItem(req, res) {
    res.send("editItem");
  }
}

module.exports = new ItemController();
