const { Router } = require('express');
const express = require('express');
const { consultarLibros, crearLibro, verificarLibroTitulo, verificarLibroId, actualizarLibro, eliminarLibro } = require('../controllers/libro.controller');
const { camposLibro } = require('../utils/campoVacio');
const { tokenBibliotecario } = require('../utils/rolesBibliotecario');

const router = express.Router();



router.get('/consultarLibro', [tokenBibliotecario],async(req,res)=>{

    const respuesta = await consultarLibros();
    
    
    if(respuesta){
        res.status(200).json({
            message: "Se consulto la informacion de libros",
            body: respuesta
        })
    }else{
        res.status(400).json({
            message: "Error al consultar Usuario",
        })
    }


    
})


router.post('/crearLibro',[tokenBibliotecario],async(req,res)=>{

    
    const campos = await camposLibro(req)

    if(campos){
        return res.status(400).json({
        message: `No ingresó el campo ${campos.nombre}`,
         code: -1
       });
   }


    
    const verificarLibro = await verificarLibroTitulo(req);
    if(verificarLibro){
        return res.status(400).json({
            message: "El libro ya existe",
            
        })
    }

    const respuesta = await crearLibro(req);
    
    if(respuesta){
        res.status(200).json({
            message: "Se inserto el Libro",
            body: respuesta
        })
    }else{
        res.status(400).json({
            message: "Error al ingresar Libro",
            body: respuesta
        })
    }


    
})



router.put('/actualizarLibro/:id',[tokenBibliotecario], async(req,res)=>{

    const campos = await camposLibro(req)

    if(campos){
        return res.status(400).json({
        message: `No ingresó el campo ${campos.nombre}`,
         code: -1
       });
   }



    const verificar = await verificarLibroId(req);
    if(!verificar){
        return res.status(400).json({
            message: "El id no existe"
        })
    }


    const respuesta = await actualizarLibro(req);
    if(respuesta){
        res.status(200).json({
            message: "se actualizo el Libro"
        })
    }else{
        res.status(400).json({
            message: "error al actualizar Libro"
        })
    }



})



router.delete('/eliminarLibro/:id',[tokenBibliotecario], async(req,res)=>{

    const verificar = await verificarLibroId(req);
    if(!verificar){
        return res.status(400).json({
            message: "El id no existe"
        })
    }


    const respuesta = await eliminarLibro(req)

    if(respuesta){
        res.status(200).json({
            message: "el libro fue eliminado"
        })
    }else{
        res.status(400).json({
            message: "error al eliminar libro"
        })
    }


})



module.exports = router





