// Ruta: /api/parejas
const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');

/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');
/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearPareja, getParejas } = require('../controllers/parejas');


const router = Router();


/* crear paciente */
router.post('/', [

    validarJWT,

    check('nombreyapellido', ' nombre y apellido es obligatorio').not().isEmpty(),
    check('lugarnacimiento', ' lugar de nacimiento es obligatorio').not().isEmpty(),
    check('fechanacimiento', ' fecha de es obligatorio').not().isEmpty(),
    check('ocupacion', ' ocupacion es obligatorio').not().isEmpty(),
    check('direccion', ' direccion es obligatorio').not().isEmpty(),
    check('telefono', ' telefono es obligatorio').not().isEmpty(),
    check('cedula', 'cedula es obligatorio').not().isEmpty(),
    check('escolaridad', ' escolaridad es obligatorio').not().isEmpty(),
    check('estrato', ' estrato es obligatorio').not().isEmpty(),
    check('eps', ' eps es obligatorio').not().isEmpty(),
    check('nombreyapellido2', ' nombre y apellido es obligatorio').not().isEmpty(),
    check('lugarnacimiento2', ' lugar de nacimiento es obligatorio').not().isEmpty(),
    check('fechanacimiento2', ' fecha de es obligatorio').not().isEmpty(),
    check('ocupacion2', ' ocupacion es obligatorio').not().isEmpty(),
    check('direccion2', ' direccion es obligatorio').not().isEmpty(),
    check('telefono2', ' telefono es obligatorio').not().isEmpty(),
    check('cedula2', 'cedula es obligatorio').not().isEmpty(),
    check('escolaridad2', ' escolaridad es obligatorio').not().isEmpty(),
    check('estrato2', ' estrato es obligatorio').not().isEmpty(),
    check('eps2', ' eps es obligatorio').not().isEmpty(),



    validarCampos,

], crearPareja);

/* obtener parejas, no voy a validar jwt peude que este get no sea necesario debido a que necesito traer de a uno  */
router.get('/', getParejas);






module.exports = router;