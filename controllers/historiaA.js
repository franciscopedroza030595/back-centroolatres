const { response } = require('express');

/* importo modelo */
const HistoriaA = require('../models/historiaA');


const getHistoriaA = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const historiaA = await HistoriaA.find().populate('usuario', 'nombre apellido').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        historiaA: historiaA
    });
}

const crearhistoriaA = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {



        /* voy a verificar  si ya tiene historiaA */

        /* const [existeEnHistoria] = await Promise.all([HistoriaA.findOne({ paciente: paciente, usuario: uid })]); */
        const existeEnHistoria = await HistoriaA.findOne({ paciente: paciente });


        if (existeEnHistoria) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya tiene historia Adulto',
                uid
            });
        } else {



            const historiaA = new HistoriaA({

                usuario: uid,
                ...req.body
            });


            /* --------------------------------- */
            const historiaADB = await historiaA.save();

            res.json({
                ok: true,
                historiaA: historiaADB
            });

        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'

        });
    }


    res.json({
        ok: true,
        msg: 'crear historia adulto'
    });
}



const borrarHistoriaA = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'historia borrada'
    });
}

const actualizarHistoriaA = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const historiaADB = await HistoriaA.findById(uid);
        /* si el concurso no existe */
        if (!historiaADB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la historia de adulto'
            });
        }


        /* si el concurso existe */
        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const historiaActualizado = await HistoriaA.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            historiaA: historiaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}



module.exports = {
    getHistoriaA,
    crearhistoriaA,
    borrarHistoriaA,
    actualizarHistoriaA
}