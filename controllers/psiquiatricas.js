const { response } = require('express');

/* importo modelo */
const Psiquiatrica = require('../models/psiquiatrica');


const getPsiqui = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const psiquiatrica = await Psiquiatrica.find().populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        historia: psiquiatrica
    });
}

const crearPsiqui = async(req, res = response) => {


    const { paciente } = req.body;

    const uid = req.uid;


    try {


        const existeEnHistoria = await Psiquiatrica.findOne({ paciente: paciente });


        if (existeEnHistoria) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente ya tiene historia Psiquiatrica',
                uid
            });
        } else {


            const psiqui = new Psiquiatrica({

                usuario: uid,
                ...req.body
            });


            /* --------------------------------- */
            const historiaDB = await psiqui.save();

            res.json({
                ok: true,
                historia: historiaDB
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

const actualizarPsiqui = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const historiaDB = await Psiquiatrica.findById(uid);

        if (!historiaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la historia de adulto'
            });
        }



        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const historiaActualizado = await Psiquiatrica.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            historia: historiaActualizado
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
    getPsiqui,
    crearPsiqui,
    actualizarPsiqui
}