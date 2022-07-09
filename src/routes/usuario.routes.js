const { Router } = require('express');
const express = require('express');
const { body } = require('express-validator');


const router = express.Router();
const {crearUsuario , consultarUsuario, eliminarUsuario, consultarUsuarioID, actualizarUsuario}= require('../controllers/usuario.controller');
const { camposUsuario } = require('../utils/campoVacio');





router.post('/crearUsuario' , async(req,res)=>{


    const  campos = await camposUsuario(req)

   if (campos) {
       return res.status(400).json({
           message: `No ingresó el campo ${campos.nombre}`,
           code: -1
       })
   }


   const verificar = await consultarUsuarioID(req);

   if(verificar){
       return res.status(400).json({
           message:'usuario ya existe en la BD'
       })
   }



   const respuesta = await crearUsuario(req);


   if(res){
       res.status(200).json({
           message: "ok",
           body: respuesta
       })
   }else{
    res.status(400).json({
        message: "error",
        body: respuesta
    })
   }

   

})



router.get('/consultarUsuario', async(req,res)=>{


    const respuesta = await consultarUsuario();
    
    
    if(respuesta){
        res.status(200).json({
            message: "Se consulto la informacion de usuarios",
            body: respuesta
        })
    }else{
        res.status(400).json({
            message: "Error al consultar Usuario",
        })
    }

})



router.delete('/eliminarUsuario/:id', async(req,res)=>{


   
    
    const verificar = await consultarUsuarioID(req)

    console.log('verifiacion: '+verificar)
    
    if(!verificar){
        return res.status(400).json({
            message: 'no existe el id'
        })
    }


    const respuesta = await eliminarUsuario(req);

    if(respuesta){
        res.status(200).json({
            message: "usuario eliminado",
            body: respuesta
        })
    }else{
        res.status(400).json({
            message: "ocurrio un error en la eliminacion del usuario",
            body: respuesta
        })
    }

})



router.put('/actualizarUsuario/:id', async(req,res)=>{


    const  campos = await camposUsuario(req)

    if (campos) {
        return res.status(400).json({
            message: `No ingresó el campo ${campos.nombre}`,
            code: -1
        })
    }


    const verificar = await consultarUsuarioID(req)

    console.log('verifiacion: '+verificar)
    
    if(!verificar){
        return res.status(400).json({
            message: 'no existe el id'
        })
    }


    const respuesta = await actualizarUsuario(req)

    if(respuesta){
        res.status(200).json({
            message:'se actualizo el usuario'
        })
    }else{
        res.status(400).json({
            message:'error no se actualizo el usuario'
        })
    }



})


module.exports = router;
