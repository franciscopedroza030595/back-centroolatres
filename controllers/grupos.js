const { response } = require('express');

/* importo modelo */
const Grupo = require('../models/grupo');


const getGrupo = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual del paciente traer todos los datos
    const grupo = await Grupo.find().populate('usuario', 'nombre apellido email').populate('paciente', 'nombreyapellido  cedula ');

    res.json({
        ok: true,
        grupo: grupo
    });
}

const crearGrupo = async(req, res = response) => {




    const uid = req.uid;


    try {


        const grupo = new Grupo({

            usuario: uid,
            ...req.body
        });


        /* --------------------------------- */
        const grupoDB = await grupo.save();

        res.json({
            ok: true,
            grupo: grupoDB
        });



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admi'

        });
    }


    res.json({
        ok: true,
        msg: 'crear grupo'
    });
}



const borrarGrupo = (req, res = response) => {

    /* borrar */

    res.json({
        ok: true,
        msg: 'grupo barrada'
    });
}

const actualizarGrupo = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const grupoDB = await Grupo.findById(uid);
        /* si el concurso no existe */
        if (!grupoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el grupo'
            });
        }


        /* si el concurso existe */
        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const grupoActualizado = await Grupo.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            grupo: grupoActualizado
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
    getGrupo,
    crearGrupo,
    borrarGrupo,
    actualizarGrupo
}