
const client = require('../../database/dbConnection')


const crearComentario = async(req)=>{

    try {
        const {  id_libro, id_usuario, descripcion, id_calificacion  } = req.body
        const respuesta = await client.query('INSERT INTO t_comentarios( id_libro, id_usuario, descripcion, id_calificacion) VALUES ( $1, $2, $3, $4)',[ 
            id_libro,
            id_usuario,
            descripcion,
            id_calificacion
        ])


        return respuesta
    } catch (error) {
        console.error(error)
    }

 }



 const consultarComentarioID = async(req)=>{ 
    try {

        if(req.params.id){ 
            let respuesta = await client.query('select *from t_comentarios where id_comentario=$1',[ 
                req.params.id
            ])
    
            if(JSON.stringify(respuesta.rows[0])===[]){
                respuesta = null;
                }else{
                respuesta = respuesta.rows[0];
            }

            return respuesta

        }else{ 

            const {  id_libro, id_usuario } = req.body
            let respuesta = await client.query('select *from t_comentarios where id_libro=$1 and id_usuario=$2',[ 
            id_libro,
            id_usuario
            ])

             if(JSON.stringify(respuesta.rows[0])===[]){
                 respuesta = null;
            }else{
                 respuesta = respuesta.rows[0];
             }

        return respuesta
         }

    } catch (error) {
        console.error(error)
    }
  }




  const consultarComentario = async()=>{ 
      try {
        const respuesta = await client.query('select *from view_comentarios')
        return respuesta.rows

      } catch (error) {
        console.error(error)
      }
   }



   const actualizarComentario = async(req)=>{ 
    try {

        const id = req.params.id


        const {  id_libro, id_usuario, descripcion, id_calificacion  } = req.body
        let respuesta = await client.query('UPDATE t_comentarios SET  id_libro=$1, id_usuario=$2, descripcion=$3, id_calificacion=$4 WHERE id_comentario=$5',[ 
            id_libro,
            id_usuario,
            descripcion,
            id_calificacion,
            id
        ])


        return respuesta
    } catch (error) {
        console.error(error)
    }
  }


  const eliminarComentario = async(req)=>{ 
    try {
      const respuesta = await client.query('delete from t_comentarios where id_comentario = $1',[ 
          req.params.id
      ])
      return respuesta

    } catch (error) {
      console.error(error)
    }
 }


 module.exports= { crearComentario, consultarComentarioID , consultarComentario, actualizarComentario, eliminarComentario} 