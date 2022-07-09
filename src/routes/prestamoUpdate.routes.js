const express = require('express');
const { consultarPrestamoId, actualizarPrestamo } = require('../controllers/prestamo.controllers');
const { campoActulizarPrestamo } = require('../utils/campoVacio');
const { tokenBibliotecario } = require('../utils/rolesBibliotecario');

const router = express.Router();




router.put('/actualizarPrestamo/:id',[tokenBibliotecario], async(req,res)=>{


    if(!req.params.id){
        return res.status(400).json({
            message: "Ingrese el id /:ID"
        })
    }


    const verificar = await consultarPrestamoId(req);


    if(!verificar){
        return res.status(400).json({
            message: "No exise el ID del prestamo"
        })
    }

    const campos = await campoActulizarPrestamo(req)
   
    if (campos) {
        return res.status(400).json({
            message: `No ingresó el campo ${campos.nombre}`,
            code: -1
            });
     }
    
   
    const respuesta = await actualizarPrestamo(req)

    
    if(respuesta==1){
        res.status(200).json({
            message: "Se actualizo el prestamo"
        })
    }else{
        res.status(400).json({
            message: "Verifique el ID del libro o del Prestamo"
        })
    }

})



module.exports= router;

