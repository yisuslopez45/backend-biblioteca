const { Router } = require('express');
const express = require('express');
const { encontrarClasificiacion } = require('../controllers/libro.controller');
const { crearPrestamo, consultarPrestamo, eliminarPrestamo, consultarPrestamoId } = require('../controllers/prestamo.controllers');
const { obteneCorreoUsuario } = require('../controllers/usuario.controller');
const { camposPrestamo } = require('../utils/campoVacio');
const enviarCorreo = require('../utils/email');
const { tokenCliente } = require('../utils/rolCliente');
const { tiempoPrestamo, encontrarDias } = require('../utils/verificarFechas');


const router = express.Router();



router.post('/crearPrestamo',[tokenCliente], async(req,res)=>{

    const campos = await camposPrestamo(req);

    if(campos){
        return res.status(400).json({
        message: `No ingresó el campo ${campos.nombre}`,
         code: -1
       });
   }


    const verificar = await consultarPrestamoId(req)

    if(verificar){
        return res.json({
            message:('la solicitud del prestamo ya existe')
        })
    }


    const { fecha_devolucion } = req.body
    const dias = await encontrarDias(fecha_devolucion)
    const clasificacion = await encontrarClasificiacion(req)
    
    const aux = await tiempoPrestamo(clasificacion,dias,res);

    console.log(aux)
     
    if(aux===true){

       const query = await crearPrestamo(req)
      
        const correo = await obteneCorreoUsuario(req.body.id_usuario)

    
        if(query){

            let mailOptions = {
                from: process.env.EMAIL_FROM, 
                to: correo,
                subject: 'Prestamo Biblioteca', 
                text: 'El prestamo del libro fue exitoso'
                
            };

            enviarCorreo.sendMail(mailOptions,(err, info)=>{
                if(err){
                   console.error(err)
                }else{
                    console.log("se envio con exito")
                }
            })


            res.status(200).json({
                message: "el prestamos es correcto"
            })
        }else{
            res.status(400).json({
                message: "ocurrio un error al crear Prestamos"
            })
        }


    }


})


router.get('/consultarPrestamos',[tokenCliente], async(req,res)=>{
    
    const query = await consultarPrestamo();

    console.log(query);

    if(query){
        res.status(200).json({
            message: "se obtuvo la informacion de los prestamos",
            body: query
        })
    }else{
        res.status(400).json({
            message: "ocurrio un erro al obtener los prestamos"
        })
    }

})


router.delete('/eliminarPrestamo/:id',[tokenCliente] ,async(req,res)=>{
    
    
    const verificar = await consultarPrestamoId(req)

    if(!verificar){
        return res.json({
            message:('El ID del prestamo no existe')
        })
    }



    const query = await eliminarPrestamo(req);

    console.log(query);

    if(query){
        res.status(200).json({
            message: "se elimino la informacion de los prestamos",
            body: query
        })
    }else{
        res.status(400).json({
            message: "ocurrio un error al eliminar el prestamo"
        })
    }

})







module.exports= router;