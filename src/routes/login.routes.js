const express = require('express');
const loginUsuario = require('../controllers/login.controller');
const { campoLogin } = require('../utils/campoVacio');
const router = express.Router();
const {generarJwt } = require('../utils/jwtAuth')


router.post("/login", async (req,res)=>{

    try {

    const {correo, password} = req.body

    console.log(correo, password)

    const campos = await campoLogin(req)
      
    if(campos){
        return res.status(400).json({
            msg: `campo vacio ${campos.nombre}`,
            code: -1
        })
    }


        const login =await loginUsuario(correo, password)


        if(login){

            
                const payload = {
                    nombre: login.nombres,
                    correo: login.correo,
                    rol: login.id_rol
                }


                const tokenGenerado = generarJwt(payload)
                
                

            res.status(200).json({
                msg: "el inicio de sesion fue exitoso",
                tokenGenerado,
                code: 1
            })
        }else{
            res.status(400).json({
                msg: "no hay coincidencias",
                code: -1
            })
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "no existe el correo en la BD",
            code: -1
        })
    }
   
})


module.exports = router;