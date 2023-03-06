let user = [];

class User{

    async new( date ){
        console.log(date)     



            return {
                status: 400,
                msg: 'Não foi possível finalizar o cadastro.'
            }
        
    }

    async remove(req,res){
    }

    async update(req,res){

    }

}

module.exports = new User()