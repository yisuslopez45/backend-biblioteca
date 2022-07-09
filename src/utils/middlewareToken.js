const express = require("express");
const router = express.Router();
const { verificarJwt, rolToken } = require("./jwtAuth");



router.use((req,res,next)=>{

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

       // const deco = rolToken(token);

        req.rol = token;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Hubo un error al intentar verificar token",
            code: -1
        })
    }



})






module.exports = router;