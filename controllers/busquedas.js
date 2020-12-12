/* voy a importar para tener las ayudas de res status */
const { response } = require('express');

/* importo el modelo de usuario, paciente y Pareja lo necesito para buscar alli  */
const Paciente = require('../models/paciente');

const Usuario = require('../models/usuario');

const Pareja = require('../models/pareja');

const HistoriaA = require('../models/historiaA');

/* -------------------------------------------------------------- */

/* PREGUNTAR QUE TAN NECESARIO ES UNA BUSQUEDA O SI SOLO POR COLECCION PARA BUSCAR CONCURSOS Y GRUPOS POR CONCURSO */

const getTodo = async(req, res = response) => {


    /* lo que se envia en el get /busquedad */
    const busqueda = req.params.busqueda;

    /* expresion regular */
    const regex = new RegExp(busqueda, 'i');

    /* para hacer busquedas individuales (filtros) */

    /*  creo un promise all para que el proceso sea mas rapido y no tener los 3 await */
    const [usuarios, pacientes, parejas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Paciente.find({ cedula: regex }),
        Pareja.find({ cedula: regex })
    ]);


    /* asi busco en toda la db usando expresiones regulares lo mas acorde  */

    res.json({
        ok: true,
        usuarios,
        pacientes,
        parejas

    })

}

/* ----------------------------------------------------- */

const getDocumentosColeccion = async(req, res = response) => {


    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    let data = [];

    switch (tabla) {
        case 'historiaA':

            data = await HistoriaA.findOne({ paciente: busqueda }).populate('usuario', 'nombre email').populate('paciente', 'nombreyapellido cedula');

            break;

        case 'parejas':
            data = await Pareja.find({ cedula: regex });


            break;

            /* para buscar usando el id, para esto podemos obtenerlo mostrando en lista y seleccionando la pareja */
        case 'pareja':
            data = await Pareja.findById(busqueda);

            break;


            /* para buscar pacientes por cedula */
        case 'pacientes':
            data = await Paciente.find({ cedula: regex });


            break;

            /* para buscar usando el id, para esto podemos obtenerlo mostrando en lista*/
        case 'pacienteid':
            data = await Paciente.findById(busqueda);

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });


            break;
        case 'usuario':
            data = await Usuario.find({ email: busqueda });


            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'las coleeccion deben ser las existentes'
            });

    }

    res.json({
        ok: true,
        resultados: data
    });




}


module.exports = {
    getTodo,
    getDocumentosColeccion
}