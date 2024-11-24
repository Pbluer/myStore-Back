const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
class Utils{

    getDateTimeSql() {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        let hour =  date.getHours() > 9 ? date.getHours() : `0` + date.getHours();
        let min =  date.getMinutes() > 9 ? date.getMinutes() : `0` + date.getMinutes();
        let sec =  date.getSeconds() > 9 ? date.getSeconds() : `0` + date.getSeconds();

        return ` ${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    async getDateSql() {

        let date = new Date()

        let day = date.getDate() > 9 ? date.getDate() : `0` + date.getDate();
        let monthAux = date.getMonth() + 1;
        let month = monthAux > 9 ? monthAux : `0` + monthAux;
        let year = date.getFullYear();

        return ` ${year}-${month}-${day} 00:00:00`;
    }
    
    async md5( value ) {
        return crypto.createHash('md5')
            .update(value)
            .digest('hex');
    }

    async tokenUsuario( data ){
        return jwt.sign( data , 'imagineUmaChaveSecreta'/* , { expiresIn: '1h' } */);
    }
    
    async usuarioToken( token ){
        let userToken = await jwt.verify(token, 'imagineUmaChaveSecreta');       
    }
    
    async imageBase64( path,type ){
        let bitmapString = (fs.readFileSync(path)).toString('base64');
        this.deleteUpload(path);
        return `data:${type};base64,` + bitmapString;
    }

    async deleteUpload( path ){

        fs.unlink(path, err => {
            if( err ) throw err;
        })
        
        return;
    }   

    formataDataSql(data){
        let split = data.split('/')

        return `${split[2]}-${split[1]}-${split[0]}`
    }

    formataString(value) {
        return new String(value).toString()
    }

    formataNumero(value) {
        return parseInt(value)
    }

    formataFloat(value) {
        return parseFloat(value)
    }

    formatarMoeda(value){
        return value.replace('.','').replace(',','.')
    }
}

module.exports = new Utils();