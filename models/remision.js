const { Schema, model } = require('mongoose');


const RemisionSchema = Schema({

    paciente: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que el seguimiento puede ser de un paciente
        ref: 'Paciente',

    },
    /* revisar lo de  de parejas */
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

    evaluacion: {
        type: String
    },

    diagnostica: {
        type: String

    },
    cod: {
        type: String
    },
    seguimiento: {
        type: String
    },
    medicoentidad: {
        type: String
    },

    observaciones: {
        type: String

    },

    fecha: {
        type: Date
    },
    remisiones: {
        type: Number
    },


});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
RemisionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('remision', RemisionSchema);