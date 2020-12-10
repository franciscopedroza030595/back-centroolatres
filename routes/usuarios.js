// Ruta: /api/usuarios
const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');

/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');
/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, getUsuarios } = require('../controllers/usuarios');


const router = Router();


/* crear usuario */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),

    validarCampos,

], crearUsuario);

/* obtener usuarios, no voy a validar jwt para poder traer el about us */
router.get('/', getUsuarios);






module.exports = router;