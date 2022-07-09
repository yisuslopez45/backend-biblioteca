const res = require('express/lib/response');
const client = require('../../database/dbConnection')


const listaClasificacion = async()=>{

    try {
        
        const respuesta = await client.query('select *from t_clasificaciones');
        return respuesta.rows

    } catch (error) {
        console.error("ERROR: "+error)
    }

}


module.exports = {listaClasificacion}