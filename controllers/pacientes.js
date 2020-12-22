/* voy a importar para tener las ayudas de res status */
const { response } = require('express');



/* modelo para crear ususarios */
const Paciente = require('../models/paciente');
/* genero el JWT */
const { generarJWT } = require('../helpers/jwt');




/* ------------------------------------------------------------------ */

const crearPaciente = async(req, res = response) => {

    /* debo leer el body */

    const { cedula } = req.body;





    /* voy a verificar  si existe el paciente por cedula*/
    try {

        const existeCedula = await Paciente.findOne({ cedula });

        if (existeCedula) {
            return res.status(400).json({
                ok: false,
                msg: 'El paciente  ya esta registrado'
            });
        }


        /* creo instancia del objeto Usuario */
        const paciente = new Paciente(req.body);




        /* para grabar en la base de datos  */
        await paciente.save(); // esto es una promesa entonces debe esperar

        // generar un TOKEN - JWT
        const token = await generarJWT(paciente.id);


        res.json({
            ok: true,
            paciente,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado... revisar logs'
        })
    }


}

/* ------------------------- --------------------------- ----- */

const getPacientes = async(req, res) => {

    const pacientes = await Paciente.find({}, 'nombreyapellido cedula ');

    res.json({
        ok: true,
        pacientes,
        uid: req.uid // se configurio en el middleware validar jws y se llama en la ruta primero probar con postman 
    });
}


module.exports = {

    crearPaciente,
    getPacientes
}