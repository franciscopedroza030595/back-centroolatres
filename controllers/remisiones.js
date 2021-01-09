const { response } = require('express');

/* importo modelo */
const Remision = require('../models/remision');


const getRemision = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const remision = await Remision.find().populate('usuario', 'nombre apellido ').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        remision: remision
    });
}

const crearRemision = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {


        const remisiones = await Remision.countDocuments({ paciente: paciente });


        /*  if (existeEnHistoria) {
             return res.status(400).json({
                 ok: false,
                 msg: 'El paciente ya tiene historia Adulto',
                 uid
             });
         } else { */



        const remision = new Remision({

            remisiones: remisiones + 1, //sumo uno ya que es una nueva remision
            usuario: uid,
            ...req.body
        });


        /* --------------------------------- */
        const remisionDB = await remision.save();

        res.json({
            ok: true,
            remision: remisionDB
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
        msg: 'creada la remision'
    });
}


/* esto no esta implementado */
const borrarRemision = (req, res = response) => {

    /* borrar */

    res.json({
        ok: true,
        msg: 'borrado'
    });
}

const actualizarRemision = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const remisionDB = await Remision.findById(uid);
        /* si  no existe */
        if (!remisionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe '
            });
        }


        /* si  existe */
        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const remisionActualizado = await Remision.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            remision: remisionActualizado
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
    getRemision,
    crearRemision,
    borrarRemision,
    actualizarRemision
}