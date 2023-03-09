
class Utils{

    async getDateTimeSql() {

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

    async formatDateSql( value ){}
}

module.exports = new Utils();