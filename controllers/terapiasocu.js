const { response } = require('express');

/* importo modelo */
const Terapia = require('../models/terapiaOcu');


const getTerapias = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const terapiaocu = await Terapia.find().populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        historia: terapiaocu
    });
}

const crearTerapia = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {


        const existeEnTerapia = await Terapia.findOne({ paciente: paciente });


        if (existeEnTerapia) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya tiene terapia ocupacional',
                uid
            });
        } else {


            const terapia = new Terapia({

                usuario: uid,
                ...req.body
            });


            /* --------------------------------- */
            const terapiaaDB = await terapia.save();

            res.json({
                ok: true,
                terapia: terapiaaDB
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
        msg: 'crear historia psiquiatrica'
    });
}



/* const borrarHistoriaA = (req, res = response) => {



    res.json({
        ok: true,
        msg: 'historia borrada'
    });
} */

const actualizarTerapia = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const terapiaDB = await Terapia.findById(uid);

        if (!terapiaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la historia de adulto'
            });
        }



        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const terapiaActualizado = await Terapia.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            terapia: terapiaActualizado
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
    getTerapias,
    crearTerapia,
    actualizarTerapia
}