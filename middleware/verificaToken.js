const Database = require('../DataBase/index.js')
const jwt = require('jsonwebtoken');

module.exports = async function verificaToken(req,res,next){
    
    let token = req.headers.authorization;
    if( !token ){
        res.status(400)
        res.json({
            status: 400,
            mensage: 'Entre em contato com o suporte'
        });
        return;
    }

    let userToken = await jwt.verify(token, 'imagineUmaChaveSecreta');

    if( userToken.codigo && userToken.email ){
        try{
            let result = await Database('usuario').count('codigo as qtd').select().where({ codigo:userToken.codigo,email: userToken.email })
            
            if( result[0].qtd > 0 ){
                res.locals.codigoUsuario = userToken.codigo
                next()
                return 
            }else{
                res.status(302)
                res.json({
                    status: 302,
                    mensage: 'Usuário não existe ou sem permissão'
                });
                return;
            }

        }catch(err){
            console.log(err)
        }
    }
};