const { response } = require('express');

/* importo modelo */
const Seguimiento = require('../models/seguimiento');


const getSeguimiento = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const seguimiento = await Seguimiento.find().populate('usuario', 'nombre apellido ').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        Seguimiento: seguimiento
    });
}

const crearSeguimiento = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {



        /* voy a verificar  si ya tiene historiaA */


        const sesiones = await Seguimiento.countDocuments({ paciente: paciente });


        /*  if (existeEnHistoria) {
             return res.status(400).json({
                 ok: false,
                 msg: 'El paciente ya tiene historia Adulto',
                 uid
             });
         } else { */



        const seguimiento = new Seguimiento({

            sesiones: sesiones + 1, //sumo uno ya que es una nueva sesion
            usuario: uid,
            ...req.body
        });


        /* --------------------------------- */
        const seguimientoDB = await seguimiento.save();

        res.json({
            ok: true,
            seguimiento: seguimientoDB
        });

        /*   } */

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'

        });
    }


    res.json({
        ok: true,
        msg: 'creado el seguimiento'
    });
}


/* esto no esta implementado */
const borrarSeguimiento = (req, res = response) => {

    /* borrar */

    res.json({
        ok: true,
        msg: 'borrado'
    });
}

const actualizarSeguimiento = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const seguimientoDB = await Seguimiento.findById(uid);
        /* si  no existe */
        if (!seguimientoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe '
            });
        }


        /* si  existe */
        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const seguimientoActualizado = await Seguimiento.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            seguimiento: seguimientoActualizado
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
    getSeguimiento,
    crearSeguimiento,
    borrarSeguimiento,
    actualizarSeguimiento
}