let DB = require('../DataBase/data.js')
class Item{

    async new( value ){
        let {  nome, preco, descricao, tamanho, tecido, modelo } = value;
        
        let sizeDados = await DB.getSize();

        let alreadyExist = await this.findByName( nome );
        
        if( !alreadyExist ){
            
            let res = await DB.edit( {
                id: 1,
                nome:nome,
                preco:preco,
                descricao: descricao,
                tamanho: tamanho         
            } );

            if( res.status == 200 ){
                return res
            }
            
        }


        return {
            status: 200
        } 

    }

    async findByName( value ){
        let dados = await DB.getAll();

        if( dados.length > 1){
            console.log('encontrar nome')
        }else{
            return null
        }

    }
    async remove(req,res){
    }

    async update(req,res){}

}

module.exports = new Item()