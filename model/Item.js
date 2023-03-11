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

    async findByName( name ){

        try{
            let result = await DataBase('item').select().where( { name:name } );
            
            if( result.length > 0){
                return false;
            }else{
                return true
            }            
        }catch(err){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    
    }

    async findById( id ){

        try{
            let result = await DataBase('item').select().where( { id:id } );

            if( result.length > 0){
                return result;
            }else{
                return false;
            }            
        }catch(err){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }
    
    }

    async getAll(){

        try{

            let result = await DataBase.select().table('item');

            if(!result){
                return null
            }else{
                return result;
            }
            
        }catch( err ){
            return {
                err: err.mensage,
                status: 400
            };
        }
    }

    async remove( id ){
       
        try{
            let result = await DataBase('item').where({ id: id }).delete();
           
            if( result > 0 ){
                
                return {
                    status: 200,
                    mensage: 'Item excluido com sucesso.'
                }

            }else{
                return {
                    status: 400,
                    mensage: 'item não encontrado.'
                }
            }

        }catch( err){
            return {
                status:400,
                mensage:err.sqlMessage
            }
        }

    }

    async update( dados ){
      
        let { id, name, price, size, type } = dados;

        try{
            let findItem = await this.findById(id);
            
            if( !findItem ){
                return {
                    status: 400,
                    mensage: 'Item não encontrado.'
                }
            }

        }catch(err){
            return {
                status: 400,
                mensage: err.sqlMessage
            }
        }

        try{

            let date = await utils.getDateTimeSql();

            let result = await DataBase('item').where({ id:id }).update({
                name: name,
                price: price,
                size: size,
                type: type,
                update_at: date
            });

            if( result > 0 ){
                return {
                    status:200,
                    mensage: 'Item alterado.'
                }
            }
        }catch( err ){
            return {
                status:400,
                mensage: err.sqlMessage
            }
        } 

    }

}

module.exports = new Item()