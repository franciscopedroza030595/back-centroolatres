/* voy a importar para tener las ayudas de res status */
const { response } = require('express');



/* modelo para crear ususarios */
const Pareja = require('../models/pareja');
/* genero el JWT */
const { generarJWT } = require('../helpers/jwt');




/* ------------------------------------------------------------------ */

const crearPareja = async(req, res = response) => {

    /* debo leer el body */

    const { cedula } = req.body;
    const { cedula2 } = req.body;





    /* voy a verificar  si existe el paciente por cedula*/
    try {

        const existeCedula = await Pareja.findOne({ cedula });
        const existeCedula2 = await Pareja.findOne({ cedula2 });

        if (existeCedula && existeCedula2) {
            return res.status(400).json({
                ok: false,
                msg: 'La pareja ya esta registrada'
            });
        }

        /* creo instancia del objeto Usuario */
        const pareja = new Pareja(req.body);




        /* para grabar en la base de datos  */
        await pareja.save(); // esto es una promesa entonces debe esperar

        // generar un TOKEN - JWT
        const token = await generarJWT(pareja.id);


        res.json({
            ok: true,
            pareja,
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

const getParejas = async(req, res) => {

    const parejas = await Pareja.find({}, 'nombreyapellido cedula nombreyapellido2 cedula2 ');

    res.json({
        ok: true,
        parejas,
        uid: req.uid // se configurio en el middleware validar jws y se llama en la ruta primero probar con postman 
    });
}


module.exports = {

    crearPareja,
    getParejas
}