const client = require('../../database/dbConnection')
const bcrypt = require("bcrypt");

const crearPrestamo = async(req)=>{

    try {
        
        const { id_usuario,id_libro,fecha_devolucion, descripcion } = req.body

       
            respuesta= await client.query('INSERT INTO t_prestamos( id_usuario, id_libro, fecha_devolucion, descripcion, estado_solicitud) VALUES ( $1, $2, $3, $4, $5);',[
                id_usuario,
                id_libro,
                fecha_devolucion,
                descripcion,
                'false'
            ])

           // console.log(respuesta)
        
        
     
        return respuesta;
        

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

}


const consultarPrestamo = async ()=>{
    try {

    const respuesta = await client.query('select *from view_prestamos')
        
    return  respuesta.rows;
        

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}




const eliminarPrestamo = async (req)=>{
    try {

    const respuesta = await client.query('delete from t_prestamos where id_prestamo=$1',[req.params.id])
        
    return  respuesta.rows;
        

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}

const actualizarPrestamo = async(req)=>{

    let respuesta 

    try {
        
        const id_prestamo = req.params.id;
        const {id_libro, estado_prestamo}=  req.body;

        console.log(id_libro, estado_prestamo, id_prestamo)


        
        const query1 = await client.query(' update t_prestamos SET estado_solicitud = false where id_libro = $1',[
            id_libro
        ])
        
      

       respuesta  = await client.query('UPDATE t_prestamos SET estado_solicitud ='+estado_prestamo+' WHERE id_prestamo='+id_prestamo+'and id_libro='+id_libro)


        console.log("estado: "+respuesta.rowCount)

        
        if(respuesta.rowCount==0){
            respuesta = null;
        }else{
            respuesta = respuesta.rowCount;
        }


      
        return respuesta

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

}



const consultarPrestamoId = async(req)=>{

    


    try {
        
        const {id_libro, id_usuario} = req.body;

        if(req.params.id){
            let respuesta = await client.query('select *from t_prestamos  where id_prestamo = $1',[
                req.params.id
            ])
     
            if(JSON.stringify(respuesta.rows[0])===[]){
             respuesta = null;
             }else{
             respuesta = respuesta.rows[0];
             }


             return respuesta;

        }else{

        
            let respuesta2 = await client.query('select *from t_prestamos  where id_usuario = $1 and id_libro = $2',[
                id_usuario,
                id_libro
            ])
           
            if(JSON.stringify(respuesta2.rows[0])===[]){
             respuesta2 = null;
             }else{
             respuesta2 = respuesta2;
             }
        
            
             return respuesta2.rows[0];
        }

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

   

}




module.exports = {crearPrestamo, consultarPrestamo, eliminarPrestamo, actualizarPrestamo, consultarPrestamoId}