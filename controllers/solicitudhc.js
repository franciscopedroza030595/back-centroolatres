const { response } = require('express');

/* importo modelo */
const SolicitudHc = require('../models/solicitudhc');


const getSolicitudhc = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const solicitudhc = await SolicitudHc.find().populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        solicitudhc: solicitudhc
    });
}

const crearSolicitudhc = async(req, res = response) => {


    /* const { paciente } = req.body; */

    const uid = req.uid;


    try {


        const solicitudhc = new SolicitudHc({

            usuario: uid,
            ...req.body
        });


        /* --------------------------------- */
        const historiaADB = await solicitudhc.save();

        res.json({
            ok: true,
            historiaA: historiaADB
        });



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'

        });
    }


    res.json({
        ok: true,
        msg: 'crear solicitud'
    });
}



/* const borrarSolicitud = (req, res = response) => {

    --codigo para borrar de moongoze

    res.json({
        ok: true,
        msg: 'historia borrada'
    });
} */

/* const actualizarSolicitud = async(req, res = response) => {

    
    const uid = req.params.id;


    try {

        const solicitudDB = await SolicitudHc.findById(uid);
    
        if (!solicitudDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la historia de adulto'
            });
        }


     
        const {...campos } = req.body;


        const solicitudActualizado = await SolicitudHc.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            solicitud: solicitudActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
} */



module.exports = {
    getSolicitudhc,
    crearSolicitudhc,



}