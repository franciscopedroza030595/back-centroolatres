const { response } = require('express');

/* importo modelo */
const TerapiaP = require('../models/terapiaP');


const getParejaP = async(req, res = response) => {

    // en post verifico que del usuario(medico) que se tiene el id me trae el nombre y apellido, igual de la pareja traer todos los datos
    const parejaP = await TerapiaP.find().populate('usuario', 'nombre apellido').populate('pareja', 'nombreyapellido lugarnacimiento fechanacimiento ocupacion direccion telefono cedula estrato eps escolaridad');

    res.json({
        ok: true,
        parejaP: parejaP
    });
}

const crearparejaP = async(req, res = response) => {


    const { pareja } = req.body;

    const uid = req.uid;


    try {



        /* voy a verificar  si ya tiene terapiaPareja */


        const existeEnTerapia = await TerapiaP.findOne({ pareja: pareja });


        if (existeEnTerapia) {
            return res.status(400).json({
                ok: false,
                msg: 'la pareja ya tiene terapia creada',
                uid
            });
        } else {



            const terapiaP = new TerapiaP({

                usuario: uid,
                ...req.body
            });


            /* --------------------------------- */
            const terapiaPDB = await terapiaP.save();

            res.json({
                ok: true,
                terapiaP: terapiaPDB
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
        msg: 'terapia pareja creada'
    });
}



const borrarTerapiaP = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'terapia borrada'
    });
}

const actualizarTerapiaP = async(req, res = response) => {

    /* obtengo id */
    const uid = req.params.id;


    try {

        const terapiaPDB = await TerapiaP.findById(uid);
        /* si el concurso no existe */
        if (!terapiaPDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la terapia'
            });
        }



        /* creo los cambios a actualizar */
        const {...campos } = req.body;


        const terapiaPactualizado = await TerapiaP.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            terapiaP: terapiaPactualizado
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
    getParejaP,
    crearparejaP,
    borrarTerapiaP,
    actualizarTerapiaP
}