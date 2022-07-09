const { Router } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const { listaClasificacion } = require('../controllers/listas.controller');
const { tokenBibliotecario } = require('../utils/rolesBibliotecario');

const router = express.Router();


router.get('/obtenerClasificaciones', [tokenBibliotecario], async(req,res)=>{

    const respuesta = await listaClasificacion();

    if(respuesta){
        res.status(200).json({
            message: "lista clasificaciones",
            body: respuesta
        })
    }else{
        res.status(400).json({
            message: "error consultar clasificaciones"
        })
    }



})


module.exports = router
