const { Schema, model } = require('mongoose');


const PacienteSchema = Schema({

    nombreyapellido: {
        type: String,
        required: true
    },
    lugarnacimiento: {
        type: String,
        required: true,

    },
    fechanacimiento: {
        type: Date,
        required: true
    },
    ocupacion: {
        type: String,
        required: true,

    },

    direccion: {
        type: String,
        required: true,


    },
    telefono: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,

    },
    escolaridad: {
        type: String,
        required: true,

    },
    estrato: {
        type: String,
        required: true,

    },
    eps: {
        type: String,
        required: true,

    }

});

/* para cambiar e _id de mongo por uid ; comprobar con postman   */
PacienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('Paciente', PacienteSchema);