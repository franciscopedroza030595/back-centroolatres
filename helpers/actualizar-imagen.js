/* paquete para leer archivos y carpetas */
const fs = require('fs');

const Paciente = require('../models/paciente');
const Pareja = require('../models/pareja');
const Usuario = require('../models/usuario');

/* voy a extraer parte de la logica de los case  */
const borrarImagen = (path) => {


    if (fs.existsSync(path)) {
        fs.unlinkSync(path); // con esto borro la imagen si ya existe , la vieja 
    }

}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    /* voy a evaluar el tipo */
    switch (tipo) {
        case 'pacientes':
            const paciente = await Paciente.findById(id);
            if (!paciente) {
                console.log('no se encontro paciente por id');
                return false; // si no existe ese paciente la imagen no se puede subir
            }





            /* antes de subir reviso si ya tiene una imagen guardada para borrar y remplazar */
            pathViejo = `./uploads/pacientes/${paciente.img}`;
            borrarImagen(pathViejo);




            paciente.firma = nombreArchivo; // le pongo al paciente el nombre del archivo
            await paciente.save(); // grabamos el paciente
            return true;

            break;


        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('no se encontro usuario por id');
                return false; // si no existe ese concurso la imagen no se puede subir
            }
            /* antes de subir reviso si ya tiene una imagen guardada para borrar y remplazar */
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);


            usuario.firma = nombreArchivo;
            await usuario.save();
            return true;

            break;

            /* para subir firmas de parejas TOCA SUBIRLO 2 entonces se hara como un arreglo */
            /* pos 0  y pos 1 , persona 1 y 2 respectivamente */
        case 'parejas':
            const pareja = await Pareja.findById(id);
            if (!pareja) {
                console.log('no se encontro la pareja por id');
                return false;
            }


            pareja.firmas.push(nombreArchivo); // le pongo  el nombre del archivo y lo pongo en el array
            await pareja.save(); // grabamos la descripcion 
            return true;

            break;

    }

}


module.exports = {
    actualizarImagen
}