/* 
    ruta:'/api/terapiaocu'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getTerapias, crearTerapia, actualizarTerapia } = require('../controllers/terapiasocu');

const router = Router();

/* middleware validarJWT */
router.get('/', getTerapias);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        check('paciente', 'El paciente id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearTerapia);




/* router.delete('/:id', ); */

// si no viene el token no puedo actualizar
router.put('/:id', validarJWT, actualizarTerapia);



module.exports = router;