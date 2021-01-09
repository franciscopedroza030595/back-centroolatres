/* voy a importar para tener las ayudas de res status */
const { response } = require('express');

/* importo el modelo de usuario, paciente y Pareja lo necesito para buscar alli  */
const Paciente = require('../models/paciente');

const Usuario = require('../models/usuario');

const Pareja = require('../models/pareja');

const HistoriaA = require('../models/historiaA');

const HistoriaN = require('../models/historiaN');

const TerapiaP = require('../models/terapiaP');

const Seguimiento = require('../models/seguimiento');

const Remision = require('../models/remision');

/* -------------------------------------------------------------- */

/* PREGUNTAR QUE TAN NECESARIO ES UNA BUSQUEDA O SI SOLO POR COLECCION PARA BUSCAR CONCURSOS Y GRUPOS POR CONCURSO */

const getTodo = async(req, res = response) => {


    /* lo que se envia en el get /busquedad */
    const busqueda = req.params.busqueda;

    /* expresion regular */
    const regex = new RegExp(busqueda, 'i');

    /* para hacer busquedas individuales (filtros) */

    /*  creo un promise all para que el proceso sea mas rapido y no tener los 3 await ESTO ES PARA BUSQUEDA TOTAL INCLUIR LO NECESARIO*/
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

        /* busco la historia de un paciente enviando el id del mismo  */
        case 'historiaA':

            data = await HistoriaA.findOne({ paciente: busqueda }).populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido cedula');

            break;

            /* busco la historia de un paciente enviando el id del mismo  */
        case 'historiaN':

            data = await HistoriaN.findOne({ paciente: busqueda }).populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido cedula');

            break;
            /* busco la terapia de una pareja enviando el id del mismo  */
        case 'terapiaP':

            data = await TerapiaP.findOne({ pareja: busqueda }).populate('usuario', 'nombre apellido email').populate('pareja', 'nombreyapellido cedula nombreyapellido2 cedula2');

            break;

            /* busco los seguimientos de un paciente enviando el id del mismo  */
        case 'seguimiento':

            data = await Seguimiento.find({ paciente: busqueda }).populate('usuario', 'nombre apellido role').populate('paciente', 'nombreyapellido cedula');

            break;

            /* busco los seguimientos por id de seguimieto */
        case 'seguimientoid':

            data = await Seguimiento.findById(busqueda).populate('usuario', 'nombre apellido role').populate('paciente', 'nombreyapellido cedula edad foto firma');

            break;

            /* busco las remisiones de un paciente enviando el id del mismo  */
        case 'remision':

            data = await Remision.find({ paciente: busqueda }).populate('usuario', 'nombre apellido role').populate('paciente', 'nombreyapellido cedula');

            break;

            /* busco  remisiones por id de remision */
        case 'remisionoid':

            data = await Remision.findById(busqueda).populate('usuario', 'nombre apellido role').populate('paciente', 'nombreyapellido cedula edad foto firma');

            break;


            /* para buscar por cedula de una pareja en todas las parejas  */
        case 'parejas':
            data = await Pareja.find({ cedula: regex });


            break;

        case 'pareja':
            data = await Pareja.findOne({ cedula: busqueda });


            break;
            /* para buscar usando el id, para esto podemos obtenerlo mostrando en lista y seleccionando la pareja */
        case 'parejaid':
            data = await Pareja.findById(busqueda);

            break;


            /* para buscar pacientes por cedula en todos los paciente*/
        case 'pacientes':
            data = await Paciente.find({ cedula: regex });


            break;
            /* para bucar un solo paciente por cedula */
        case 'paciente':
            data = await Paciente.findOne({ cedula: busqueda });


            break;

            /* para buscar usando el id, para esto podemos obtenerlo mostrando en lista*/
        case 'pacienteid':
            data = await Paciente.findById(busqueda);

            break;
            /* par buscar usuarios , revisar que tan necesario es */
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