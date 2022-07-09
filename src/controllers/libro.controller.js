
const client = require('../../database/dbConnection')



const encontrarClasificiacion = async(req)=>{

    try {

        const {id_libro} = req.body;

        let clasificacion = await client.query(`select *from t_libros where id_libro=${id_libro}`)
            
        return  clasificacion = clasificacion.rows[0].id_clasificacion;

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

   
}

const consultarLibros = async()=>{
    try {
        const respuesta = await client.query('select *from view_Libros')
        console.log(respuesta);
        return respuesta.rows
    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
}

const crearLibro = async(req)=>{
    try {

        const {codigoisbn,titulo,id_edicion, id_autor, nro_paginas, fecha_publicacion, id_clasificacion} = req.body

        const query = client.query('INSERT INTO t_libros( codigoisbn, titulo, id_edicion, id_autor, nro_paginas, fecha_publicacion, id_clasificacion)VALUES ( $1, $2, $3, $4, $5, $6, $7)',[
            codigoisbn,
            titulo,
            id_edicion,
            id_autor,
            nro_paginas,
            fecha_publicacion,
            id_clasificacion

        ])


        return (await query).rows


    } catch (error) {
      console.error("ERROR: "+error)
    }
}


const verificarLibroTitulo = async(req)=>{

    try {
        const {titulo, id_autor, codigoisbn} = req.body

        let respuesta = await client.query('select *from t_libros where titulo=$1 and codigoisbn=$2',[
            titulo,
            codigoisbn
        ])
    
        console.log(respuesta.rows)
    
    
        if(JSON.stringify(respuesta.rows[0])===[]){
            respuesta = null;
            }else{
            respuesta = respuesta.rows[0];
            }
    
    
            return respuesta;
    
    
    } catch (error) {
        console.error("ERROR: "+error.detail)
    }
  
}


const verificarLibroId = async(req)=>{

    try {
        let respuesta = await client.query('select *from t_libros  where id_libro = $1',[
            req.params.id
        ])
 
        if(JSON.stringify(respuesta.rows[0])===[]){
         respuesta = null;
         }else{
         respuesta = respuesta.rows[0];
         }


         return respuesta;

    } catch (error) {
        console.error("ERROR: "+error.detail)
    }

}



const actualizarLibro = async(req)=>{

   try {
    const id = req.params.id;
    const {codigoisbn,titulo,id_edicion, id_autor, nro_paginas, fecha_publicacion, id_clasificacion} = req.body

    const respuesta = await client.query('UPDATE t_libros SET  codigoisbn=$1, titulo=$2, id_edicion=$3, id_autor=$4, nro_paginas=$5, fecha_publicacion=$6, id_clasificacion=$7 WHERE id_libro = $8',[
        codigoisbn,
        titulo,
        id_edicion,
        id_autor,
        nro_paginas,
        fecha_publicacion,
        id_clasificacion,
        id

    ]) 

        return respuesta;
   } catch (error) {
    console.error("ERROR: "+error)
   }

}


const eliminarLibro = async(req)=>{
  
    try {
        const id = req.params.id;

        const respuesta = await client.query('delete from t_libros where id_libro=$1',[
            id
        ])
        return respuesta

    } catch (error) {
 console.error("ERROR: "+error)
    }
}


const filtrarLibro = async(req)=>{
  
    try {
       
        if( req.query.nombre_autor || req.query.apellido_autor){
           

            const { nombre_autor , apellido_autor} = req.query
             console.log( nombre_autor)
            
            let respuesta = await client.query('SELECT *FROM t_libros INNER JOIN t_autores ON t_Libros.id_autor = t_autores.id_autor  where UPPER(t_autores.nombres) = UPPER($1) or UPPER(t_autores.apellidos) = UPPER($2)  ',[
                nombre_autor,
                apellido_autor
            ])

           
        
            return respuesta.rows

         }


        if(req.query.fecha_publicacion){ 
        
            let respuesta = await client.query('select id_libro , codigoisbn, titulo, (select nombre_edicion from t_ediciones where t_ediciones.id_edicion = t_libros.id_edicion) as  edicion ,(select nombres from t_autores where t_autores.id_autor = t_libros.id_autor) as nombre_autor,(select apellidos from t_autores where t_autores.id_autor = t_libros.id_autor) as apellido_autor, nro_paginas, fecha_publicacion, (select nombre_clasificacion from t_clasificaciones where t_clasificaciones.id_clasificacion = t_libros.id_clasificacion) as clasificacion from t_libros where fecha_publicacion=$1',[ 
                req.query.fecha_publicacion
            ])

            if(JSON.stringify(respuesta.rows[0])===[]){
                respuesta = null;
                }else{
                respuesta = respuesta.rows[0];
                }

            return  respuesta
         }

         if(req.query.clasificacion){
            let respuesta = await client.query('SELECT *FROM t_libros INNER JOIN t_clasificaciones ON t_libros.id_clasificacion = t_clasificaciones.id_clasificacion  where UPPER(t_clasificaciones.nombre_clasificacion) = UPPER($1) ',[ 
                req.query.clasificacion
            ])

            if(JSON.stringify(respuesta.rows[0])===[]){
                respuesta = null;
                }else{
                respuesta = respuesta.rows[0];
                }

            return  respuesta
         }
        


    } catch (error) {
 console.error("ERROR: "+error)
    }
}



module.exports={encontrarClasificiacion, consultarLibros, crearLibro, verificarLibroTitulo, actualizarLibro, verificarLibroId, eliminarLibro, filtrarLibro}