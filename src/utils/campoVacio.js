

const camposComentario = async(req)=>{
    const {  id_libro, id_usuario ,descripcion, id_calificacion} = req.body;

    let aux = null;

    const campos = [
        {
            nombre: "id_Libro",
            valor: id_libro
        },
        {
            nombre: "id_usuario",
            valor: id_usuario
        },
        {
            nombre: "descripcion",
            valor: descripcion
        },
        {
            nombre: "id_calificacion",
            valor: id_calificacion
        }
    ];

    const campoVacio = campos.find( item => !item.valor );

    if (campoVacio) {
       aux=campoVacio;
    }


    return aux;


}


const camposLibro = async(req)=>{

    const {codigoisbn,titulo,id_edicion, id_autor, nro_paginas, fecha_publicacion, id_clasificacion} = req.body

    let aux = null

    const campos = [
        {
            nombre: "codigoisbn",
            valor: codigoisbn
        },
        {
            nombre: "titulo",
            valor: titulo
        },
        {
            nombre: "id_edicion",
            valor: id_edicion
        },
        {
            nombre: "id_autor",
            valor: id_autor
        },
        {
            nombre: "nro_paginas",
            valor: nro_paginas
        },
        {
            nombre: "id_clasificacion",
            valor: id_clasificacion
        },
        {
            nombre: "fecha_publicacion",
            valor: fecha_publicacion
        }
    ];


    const campoVacio = campos.find( item => !item.valor );

    if (campoVacio) {
       aux=campoVacio;
    }


    return aux;


}


const camposPrestamo = async(req)=>{

    const { id_usuario,id_libro,fecha_devolucion, descripcion } = req.body

    let aux = null;

    const campos = [
        {
            nombre: "id_usuario",
            valor: id_usuario
        },
        {
            nombre: "id_libro",
            valor: id_libro
        },
        {
            nombre: "fecha_devolucion",
            valor: fecha_devolucion
        },
        {
            nombre: "descripcion",
            valor: descripcion
        }
    ];


    const campoVacio = campos.find( item => !item.valor );

    if (campoVacio) {
       aux=campoVacio;
    }

    return aux;

}

const campoActulizarPrestamo = async(req)=>{

    const { id_libro,estado_prestamo } = req.body
    
    let aux = null;
       
    const campos = [
        {
            nombre: "estado_prestamo",
            valor: estado_prestamo
        },
        {
            nombre: "id_libro",
            valor: id_libro
        }
    ];

    const campoVacio = campos.find( item => !item.valor );

    if (campoVacio) {
        aux=campoVacio;
     }
 
     return aux;
 
}


const camposUsuario = async(req)=>{
    const {  nombres, apellidos, correo, password, id_rol} = req.body

    let aux = null

    const campos = [
        {
            nombre: "nombres",
            valor: nombres
        },
        {
            nombre: "apellidos",
            valor: apellidos
        },
        {
            nombre: "correo",
            valor: correo
        },
        {
            nombre: "password",
            valor: password
        },
        {
            nombre: "id_rol",
            valor: id_rol 
        }

    ];

    const campoVacio = campos.find( item => !item.valor );

    if (campoVacio) {
        aux=campoVacio;
     }
 
     return aux;
 


}



const campoLogin = async(req)=>{

    const{ correo , password} = req.body;

    let aux = null;
    const campos = [
        {
            nombre: "correo",
            valor: correo
        },

        {
            nombre: "password",
            valor: password
        }
    ];

    const camposvacios = campos.find(item => !item.valor)

    if (camposvacios) {
        aux=camposvacios;
     }
 
     return aux;
 
}

module.exports= {camposComentario, camposLibro, camposPrestamo, campoActulizarPrestamo, camposUsuario, campoLogin}