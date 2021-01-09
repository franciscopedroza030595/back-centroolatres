const { Schema, model } = require('mongoose');


const GrupoSchema = Schema({


    /* para tner el responsable y su cargo  */
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser hecha por un usuario o medico
        ref: 'Usuario',
        required: true
    },
    nombre: {

        type: String,
        required: true

    },
    area: {

        type: String,
        required: true

    },
    numeroP: {
        type: Number,
        required: true
    },
    asistentes: {
        type: Array,
        ref: 'Paciente'
    },

    tema: {
        type: String

    },

    objetivos: {
        type: String

    },
    metodologia: {
        type: String
    },
    /* para tener hora inicio y hora fin */
    fecha: {
        type: Date
    },
    fechaFin: {
        type: Date
    }


});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
GrupoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('grupo', GrupoSchema);