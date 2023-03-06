
let teste = require('./dados.json')
const { readFileSync, writeFileSync } = require('fs');
const { json } = require('body-parser');

class Database{
    
    async getAll(){

        try{
            let dados = readFileSync( './Database/dados.json', { encoding: 'utf-8',flag:'r' })
            return JSON.parse(dados);
        }catch( err ){
            return err
        }
      
    }   

    async edit( value ){
        console.log(value)
        let allData = await this.getAll();
        console.log('=====================')
        console.log(allData)
        let data = JSON.stringify(allData.push(value));
        console.log(data)
        try{
            let res =  await writeFileSync('./Database/dados.json', data ,{ encoding: 'utf-8', flag:'w' })
            console.log(res)
        }catch(err){
            console.log('erro',err)
        }
        
        return
        
    }

    async getSize(){
        let dados = await this.getAll();        
        return dados.length
    }

}


module.exports = new Database()
