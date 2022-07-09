
const jwt = require('jsonwebtoken');


const generarJwt = (payload)=>{
    const tokenGenerado = jwt.sign(
        payload,
        ""+process.env.SECRETPRIVATEKEY,
        {expiresIn: '5h'}
    )
   return tokenGenerado; 
}




const verificarJwt = (token)=>{

    const pay = jwt.verify(token, process.env.SECRETPRIVATEKEY)
  
    return  pay;
    
}

const rolToken = (token)=>{
    const decoded = jwt.decode(token, process.env.SECRETPRIVATEKEY, true)
    const {rol} = decoded
    return rol;
}



module.exports = {generarJwt, verificarJwt, rolToken};