const { Router } = require('express');
const express = require('express');
const { consultarComentarioID, crearComentario, consultarComentario, actualizarComentario, eliminarComentario }= require('../controllers/comentario.controller');
const { camposComentario } = require('../utils/campoVacio');
const { tokenCliente } = require('../utils/rolCliente');
const router = express.Router();


router.post('/crearComentario', [tokenCliente],async(req,res)=>{

   const campos = await camposComentario(req)

   if(campos){
      return res.status(400).json({
         message: `No ingresó el campo ${campos.nombre}`,
         code: -1
     });
   }



    const verificacion = await consultarComentarioID(req)

    console.log(verificacion)

    if(verificacion){ 
        return res.status(400).json({ 
            message: "el comentario ya existe"
        })
     }
     
    const respuesta = await crearComentario(req)

    if(respuesta){
         res.status(200).json({ 
            message: "se inserto el comentario"
        })
     }else{ 
        res.status(400).json({ 
            message: "error al insertar comentario"
        })
      }

})


router.get('/consultarComentario',[tokenCliente], async(req,res)=>{ 

    const respuesta = await consultarComentario()
    if(respuesta){ 
        res.status(200).json({
         message:"informacion de comentarios",
         body: respuesta
        })
     }

 })



 router.put('/actualizarComentario/:id',[tokenCliente] ,async(req,res)=>{ 


   

    const verificacion = await consultarComentarioID(req)
    if(!verificacion){ 
       return res.status(400).json({
         message:"el ID del comentario no existe",
        })
     }


     const campos = await camposComentario(req)

      if(campos){
          return res.status(400).json({
          message: `No ingresó el campo ${campos.nombre}`,
           code: -1
         });
     }





     const respuesta = await actualizarComentario(req)

     if(respuesta){ 
        res.status(200).json({ 
            message: "se actualizo el comentario"
         })
     }else{ 
        res.status(400).json({ 
            message: "error al actualizar comentario"
         }) 
      }

 })


 router.delete('/eliminarComentario/:id', [tokenCliente],async(req,res)=>{ 

    const verificacion = await consultarComentarioID(req)
    if(!verificacion){ 
       return res.status(400).json({
         message:"el ID del comentario no existe",
        })
     }


     const respuesta = await eliminarComentario(req)

     if(respuesta){ 
        res.status(200).json({ 
            message: "se elimino el comentario"
         })
     }else{ 
        res.status(400).json({ 
            message: "error al eliminar comentario"
         }) 
      }


 } )




module.exports = router