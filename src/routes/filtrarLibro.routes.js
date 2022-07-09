const { Router } = require('express');
const express = require('express');
const { filtrarLibro } = require('../controllers/libro.controller');
const { tokenCliente } = require('../utils/rolCliente');
const router = express.Router();

router.get('/filtrarLibro',[tokenCliente] ,async(req,res)=>{ 

   
  
  
   const respuesta=  await filtrarLibro(req)



   if(respuesta){ 
       res.status(200).json({ 
           message: "se realizo la consulta",
           body: respuesta
        })
    }else{ 
        res.status(400).json({ 
            message: "verifique los parametros"
         })
    }

    
 })





 module.exports= router

