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
    let id = req.params.id;

    if( parseInt(id) ){

      let result = await Item.remove(id);

      res.json(result)

    }else{
      
      res.json({
        err: 400,
        mensage: 'O parametro passado não é um inteiro.'
      })

    }

  }

  async findById(req, res) {
    let id = req.params.id

    if( parseInt(id) ){

      let result = await Item.findById(id);

      if( result ){
        return res.json(result)
      }else{
        return {
          status:400,
          mensage: 'Item não encontrado.'
        };
      }

    }else{
      return {
        status: 400
      }
    }

  }

  async findAll(req, res) {
    let result = await Item.getAll();
    
    if( result ){    
      return res.json(result);
   
    }else{
      return res.json(result)
    }

  }

  async editItem(req, res) {
    let { id ,name, price, size,type } = req.body;

    if( !id ){
      return res.json({
        status: 400,
        mensage: 'É necessário o código.'
      })
    }

    if (!name) {
      return res.json({
        err: "É necessário inserir um nome.",
        status: 403,
      });
    }

    if (!price) {
      return res.json({
        err: "É necessário inserir um preço.",
        status: 403,
      });
    }

    if (!size) {
      return res.json({
        err: "É necessário inserir um tamanho.",
        status: 403,
      });
    }

    if( type == undefined ){
      return res.json({
        err: "É necessário inserir um tipo de item.",
        status: 403,
      });
      
    }

    let result =  await Item.update( req.body );
    
    return res.json(result);
  }
}

module.exports = new ItemController();
