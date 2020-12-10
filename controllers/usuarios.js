/* voy a importar para tener las ayudas de res status */
const { response } = require('express');
/* importo el bcryptjs para la contrasena */
const bcrypt = require('bcryptjs');


/* modelo para crear ususarios */
const Usuario = require('../models/usuario');
/* genero el JWT */
const { generarJWT } = require('../helpers/jwt');




/* ------------------------------------------------------------------ */

const crearUsuario = async(req, res = response) => {

    /* debo leer el body */
    /* console.log(req.body); */
    const { email, password } = req.body;





    /* voy a verificar  si existe*/
    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        /* creo instancia del objeto Usuario */
        const usuario = new Usuario(req.body);


        /* encriptar contrasena  */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        /* para grabar en la base de datos  */
        await usuario.save(); // esto es una promesa entonces debe esperar

        // generar un TOKEN - JWT
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
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

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre apellido email role ');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid // se configurio en el middleware validar jws y se llama en la ruta primero probar con postman 
    });
}


module.exports = {

    crearUsuario,
    getUsuarios
}