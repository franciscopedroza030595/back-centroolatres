const { Schema, model } = require('mongoose');


const PacienteSchema = Schema({

    nombreyapellido: {
        type: String,
        required: true
    },
    lugarnacimiento: {
        type: String,


    },
    fechanacimiento: {
        type: Date,
        required: true
    },
    edad: {
        type: Number

    },
    ocupacion: {
        type: String,


    },

    direccion: {
        type: String,



    },
    telefono: {
        type: String,

    },
    cedula: {
        type: String,
        required: true,

    },
    escolaridad: {
        type: String,


    },
    estrato: {
        type: String,


    },
    eps: {
        type: String,


    },

    firma: {
        type: String
    },
    foto: {
        type: String
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