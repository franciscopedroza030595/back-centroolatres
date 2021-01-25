// Ruta: /api/pacientes
const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');

/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');
/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');
/* importo access-level */
const { hasAccess } = require('../middlewares/access-level');

const { crearPaciente, getPacientes } = require('../controllers/pacientes');


const router = Router();


/* crear paciente */
router.post('/', [

    /* hasAccess('Auxiliar'), */
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



    validarCampos,

], crearPaciente);

/* obtener pacientes, no voy a validar jwt peude que este get no sea necesario debido a que necesito traer de a uno  */
router.get('/', getPacientes);






module.exports = router;