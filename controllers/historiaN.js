const { response } = require('express');

/* importo modelo */
const HistoriaN = require('../models/historiaN');


const getHistoriaN = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const historiaN = await HistoriaN.find().populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        historiaN: historiaN
    });
}

const crearHistoriaN = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {



        /* voy a verificar  si ya tiene historiaA */


        const existeEnHistoria = await HistoriaN.findOne({ paciente: paciente });


        if (existeEnHistoria) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya tiene historia',
                uid
            });
        } else {



            const historiaN = new HistoriaN({

                usuario: uid,
                ...req.body
            });


            /* --------------------------------- */
            const historiaADB = await historiaN.save();

            res.json({
                ok: true,
                historiaN: historiaADB
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
        msg: 'crear historia '
    });
}



const borrarHistoriaN = (req, res = response) => {

    /* borrar */

    res.json({
        ok: true,
        msg: 'historia borrada'
    });
}

const actualizarHistoriaN = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const historiaADB = await HistoriaN.findById(uid);
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


        const historiaActualizado = await HistoriaN.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            historiaN: historiaActualizado
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
    getHistoriaN,
    crearHistoriaN,
    borrarHistoriaN,
    actualizarHistoriaN
}