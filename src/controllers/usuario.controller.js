const client = require('../../database/dbConnection')
const bcrypt = require("bcrypt");


const crearUsuario = async(req)=>{

    try {
        
        
        const {  nombres, apellidos, correo, password, id_rol} = req.body

        const passwordHash = await bcrypt.hash(password, 10);


        const query =  await client.query('INSERT INTO t_usuarios( nombres, apellidos, correo, password, id_rol) VALUES ($1, $2, $3, $4, $5)',[
            nombres,
            apellidos,
            correo,
            passwordHash,
            id_rol
        ])


    
        return query.rows[0];
    



    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}





const consultarUsuario = async()=>{

    try {

        const query =  await client.query('select *from t_usuarios')
    
        return query.rows;
    

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}



const eliminarUsuario = async(req)=>{
    try {

        const id = req.params.id

        const query = await client.query('delete from t_usuarios where id_usuario=$1',[id])

        return query
        console.log(query.rows)

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}


const consultarUsuarioID = async(req)=>{

    
    try {

        const {nombres,apellidos} = req.body;

        
        if(req.params.id){
            let respuesta = await client.query('select *from t_usuarios  where id_usuario = $1',[
                req.params.id
            ])
     
            if(JSON.stringify(respuesta.rows[0])===[]){
             respuesta = null;
             }else{
             respuesta = respuesta.rows[0];
             }


             return respuesta;

        }else{

            let respuesta = await client.query('select *from t_usuarios  where nombres = $1 and apellidos = $2',[
                nombres,
                apellidos
            ])
     
            if(JSON.stringify(respuesta.rows[0])===[]){
             respuesta = null;
             }else{
             respuesta = respuesta.rows[0];
             }

             return respuesta;

        }


    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

}


const actualizarUsuario = async(req)=>{

 

    try {

        const id = req.params.id
        const {  nombres, apellidos, correo, password, id_rol} = req.body
        const passwordHash = await bcrypt.hash(password, 10);

    
        const query = await client.query('update t_usuarios set nombres=$1, apellidos=$2 , correo = $3 , password = $4 , id_rol=$5 where id_usuario=$6',[
            nombres,
            apellidos,
            correo,
            passwordHash,
            id_rol,
            id
        ])


        return query.rows;

    } catch (error) {
        console.error("ERROR: "+error)
    }





}

const obteneCorreoUsuario = async(req)=>{

   try {

    let respuesta = await client.query('select correo from t_usuarios where id_usuario = $1',[
        req
    ])

    respuesta = respuesta.rows[0].correo

    return respuesta

   } catch (error) {
    console.error("ERROR: "+error)
   }

}


module.exports = {crearUsuario, consultarUsuario, eliminarUsuario, consultarUsuarioID, actualizarUsuario, obteneCorreoUsuario};