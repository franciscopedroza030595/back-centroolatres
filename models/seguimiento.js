const { Schema, model } = require('mongoose');


const SeguimientoSchema = Schema({

    paciente: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que el seguimiento puede ser de un paciente
        ref: 'Paciente',

    },
    /* revisar lo de seguimiento de parejas */
    pareja: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que el seguimiento puede ser de una pareja
        ref: 'Pareja',

    },
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser hecha por un usuario(medico)
        ref: 'Usuario',
        required: true
    },
    ultima: {

        type: String,
        required: true

    },
    descripcion: {
        type: String,
        required: true
    },

    situaciones: {
        type: String
    },

    progreso: {
        type: String

    },
    acuerdos: {
        type: String
    },

    observaciones: {
        type: String

    },

    fecha: {
        type: Date
    },

    fechaS: {
        type: Date
    },
    sesiones: {
        type: Number
    },


});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
SeguimientoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('Seguimiento', SeguimientoSchema);