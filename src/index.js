const express = require('express');
const { check } = require('express-validator');
require('dotenv').config({path: '.env'});


const {  campoErrores} = require('./utils/verificacionCampos');

const app = express();
app.use(express.json());

        app.use('/',[
        check('correo','correo no es valido').optional().isEmail(),
        campoErrores
        ],
        require('./routes/login.routes'))


         app.use('/',[
        check('correo','correo no es valido').optional().isEmail(),
        check('id_rol', 'El rol ingresado no existe').optional().isIn([1,2]),
        campoErrores
        ],
        require('./routes/usuario.routes'))
    

        app.use('/',[ 
        campoErrores
        ],require('./routes/filtrarLibro.routes'))


        app.use('/', [ 
        campoErrores
        ],
        require('./routes/comentario.routes'))
    
        app.use('/',[
        check('fecha_devolucion','fecha no valida yyyy/mm/dd').optional().isDate(),
        campoErrores
        ],require('./routes/prestamo.routes'))
    
    
        app.use('/',[
          check('codigoisbn','El codigo debe tener minimo 5 caracteres').optional().isLength({ min: 5, max:10 }),
         check('fecha_publicacion','fecha invalida yyyy/mm/dd').optional().isDate(),
          campoErrores
          ],require('./routes/libro.routes'))
    

        app.use('/',[
        campoErrores],
        require('./routes/prestamoUpdate.routes'))


        app.use('/', 
        campoErrores,
        require('./routes/listas.routes'))


app.listen(process.env.PORT)