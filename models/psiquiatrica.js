const { Schema, model } = require('mongoose');


const PsiquiatricaSchema = Schema({

    paciente: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser de un paciente
        ref: 'Paciente',
        required: true
    },
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser hecha por un usuario o medico
        ref: 'Usuario',
        required: true
    },
    motivo: {

        type: String,
        required: true

    },
    padecimiento: {
        type: String,

    },
    heredofamiliares: {
        type: String
    },


    antecedentesPerso: {
        type: String
    },

    antecedentesPato: {
        type: String

    },
    circuncision: {
        type: String
    },
    criptorquidia: {
        type: String
    },

    polucionesNoctu: {
        type: String
    },
    ivsa: {
        type: String
    },
    parejas: {
        type: String
    },
    ets: {
        type: String
    },
    AntecendesFami: {
        type: String
    },
    AntecendesEsco: {
        type: String
    },
    historiaPiscoSex: {
        type: String
    },
    historiaOcupa: {
        type: String
    },
    tiempoL: {
        type: String
    },
    sintomas: {
        type: String
    },
    respiratorio: {
        type: String
    },
    cardiovascu: {
        type: String
    },
    digestivo: {
        type: String
    },
    renal: {
        type: String
    },
    genital: {
        type: String
    },
    endocrino: {
        type: String
    },
    hematopoyetico: {
        type: String
    },
    piel: {
        type: String
    },
    musculoEsque: {
        type: String
    },
    nervioso: {
        type: String
    },
    organosS: {
        type: String
    },
    presion: {
        type: String
    },
    frecuencia: {
        type: String
    },
    frecuenciaC: {
        type: String
    },
    temperatura: {
        type: String
    },
    peso: {
        type: Number
    },
    talla: {
        type: Number
    },
    imc: {
        type: Number
    },
    craneo: {
        type: String
    },
    ojos: {
        type: String
    },
    oidos: {
        type: String
    },
    nariz: {
        type: String
    },
    boca: {
        type: String
    },
    cuello: {
        type: String
    },
    torax: {
        type: String
    },
    abdomen: {
        type: String
    },
    extremidades: {
        type: String
    },
    neurologica: {
        type: String
    },
    mental: {
        type: String
    },
    diagnosticos: {
        type: String
    },

    fecha: {
        type: Date
    }


});


PsiquiatricaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})


module.exports = model('Psiquiatrica', PsiquiatricaSchema);