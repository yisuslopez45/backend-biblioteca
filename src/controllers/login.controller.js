const client = require('../../database/dbConnection');
const bcrypt = require("bcrypt");


const loginUsuario = async (correo, password)=>{

    try {
        let respuesta = await client.query("select  *from t_usuarios WHERE  correo = $1",[correo])
        
    
        const pass = respuesta.rows[0].password;
        console.log(pass)

        if(JSON.stringify(respuesta.rows)===[]){
            respuesta = null;
        }else{
            const coinciden = await bcrypt.compare(password,respuesta.rows[0].password);
            if(coinciden){
               respuesta= respuesta.rows[0];
             
            }else{  
                respuesta = null;
            }

           
            
        }

      
        return respuesta;


    } catch (error) {
        console.error("ERROR: "+error)
    }
    
      
    }



    module.exports = loginUsuario;


