const encontrarDias = async (fecha_devolucion) => {



  let fecha1 = new Date();

  console.log(fecha_devolucion) 
  fecha1 = `${fecha1.getFullYear()}/${
    fecha1.getMonth() + 1
  }/${fecha1.getDate()}`;


  
  fecha1 = new Date(fecha1).getTime();
  const fecha2 = new Date(fecha_devolucion).getTime();

  let dias = fecha2 - fecha1;
  dias = dias / (1000 * 60 * 60 * 24);
 

  return dias;
};

const tiempoPrestamo = async (id_libro, dias, res) => {

  let aux = true;

  if(id_libro==1){
        if (dias > 15) 
        {
        aux=false;
        return res.status(400).json({
          message: "Diccionarios y enciclopedias menor a 15 dias",
        });
       }
  }


if(id_libro==8){
    if (dias > 7) 
    {
    aux=false;
    return res.status(400).json({
      message: "Lenguas y literatura menor a 7 dias",
    });

    }
}


if(id_libro != 1 && id_libro != 8){
    if (dias > 30) 
    {
    aux=false;
    return res.status(400).json({
      message: "libros normales menor a 30 dias"
    })
    }
  }

  return aux;

}

  

module.exports = { encontrarDias, tiempoPrestamo };
