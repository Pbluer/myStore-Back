const DataBase = require('../DataBase/index.js')
class Item{

    async new( value ){
        let {  name, price, size, type } = value;
                
        let alreadyExist = await this.findByName( name );

        if( alreadyExist ){
            
            let data = {
                name: name,
                price: price,
                size: size,
                type: type,

            };
            
            try{
               await DataBase('item').insert(data);

               return true;
            }catch( err ){
                return false;
            }

            if( res.status == 200 ){
                return res
            }
            
        }else{
            
        }

        return {
            status: 200
        } 

    }

    async findByName( value ){
        let dados = await DataBase('item').select().where('name',value);
    
        if( dados.length > 0){
            return true;
        }else{
            return false
        }

    }

    async getAll(){

        try{

            let dados = await DataBase.select('*').table('item');

            if(!dados){
                return null
            }else{
                return dados;
            }
            
        }catch( err ){
            return {
                err: err,
                status: 400
            };
        }
    }

    async remove(req,res){
    }

    async update(req,res){}

}

module.exports = new Item()