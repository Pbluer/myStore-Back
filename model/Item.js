const DataBase = require('../DataBase/index.js');
const utils = require('../Utils/utils.js')
class Item{

    async new( value ){
        let {  name, price, size, type } = value;
                
        let alreadyExist = await this.findByName( name );
        
        let date = await utils.getDateTimeSql();
        
        if( alreadyExist ){
            
            let data = {
                name: name,
                price: price,
                size: size,
                create_at: date
            };
            
            try{
               await DataBase('item').insert(data);

               return {
                status:200
               };

            }catch( err ){
                return {
                    status:400,
                    mensage: err.sqlMessage
                };
            }
            
        }else{
            return {
                status: 400,
                mensage: 'Nome já cadastrado.'
            }
        }
        
    }

    async findByName( value ){
        let dados = await DataBase('item').select().where('name',value);
    
        if( dados.length > 0){
            return false;
        }else{
            return true
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
                err: err.mensage,
                status: 400
            };
        }
    }

    async remove(req,res){
    }

    async update(req,res){}

}

module.exports = new Item()