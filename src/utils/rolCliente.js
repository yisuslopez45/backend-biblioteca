
const express = require("express");
const { verificarJwt, rolToken } = require("./jwtAuth");



const tokenCliente = async(req,res,next)=>{

    try {
        
        const authHeader = req.headers.authorization;
        
        console.log("token: "+authHeader)

        if (!authHeader) {
            return res.status(400).json({
                message: "Debe enviar el token generado!",
                code: -1
            })
        }

        const token = authHeader.replace("Bearer ", "");

        const payload = verificarJwt(token);

       const rol = rolToken(token);

        console.log("usuario:"+ rol)

    if(rol == 1){
        next()
    }else{ 
        return res.status(400).json({
            message: "Solo pueden ingresar los usuarios.!"
        })
    }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Hubo un error al intentar verificar token",
            code: -1
        })
    }
       

}

module.exports = { tokenCliente };
