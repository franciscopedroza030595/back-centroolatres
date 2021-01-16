/* 
    ruta:'/api/psiquiatrica'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getPsiqui, crearPsiqui, actualizarPsiqui } = require('../controllers/psiquiatricas');

const router = Router();

/* middleware validarJWT */
router.get('/', getPsiqui);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        check('paciente', 'El paciente id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearPsiqui);




/* router.delete('/:id', ); */

// si no viene el token no puedo actualizar
router.put('/:id', validarJWT, actualizarPsiqui);



module.exports = router;