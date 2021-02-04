const mongoose = require("mongoose")
const {Schema} = mongoose
const bcrypt = require('bcrypt')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const validator = require ('validator')

const schemaUsuario = new Schema({
    nombre: {type:String},
    email: {
        type:String,
        required:[true, "El campo de email está vacío. Por favor, introduce un email para continuar."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email inválido')
            }
        },
        index: true,
        unique: 'El email {{VALUE}} ya existe en la base de datos.'
    },
    password:{type:String, required:[true,"El campo de contraseña está vacío. Por favor, introduce una contraseña para continuar."]},
    activo:{type:Boolean, default:false}
})

//esta función "captura" el método save() y ejecuta primero
//todo el código que tiene dentro. En este caso, antes de 
//guardar un usuario, hasheará el password)
schemaUsuario.pre('save', function(next) {
    bcrypt.hash(this.password, 6)
        .then(hash=>{
            this.password = hash
            next()
        })
})

class Usuario {
    //constructor

    //get y set
    
    set emailMal(email){
        this.email=email.toLowerCase()
    }


    //privados
    comprobarPwd(password){
        //devuelve true si el password coincide y false si no
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }
}

//pluggins
schemaUsuario.plugin(beautifyUnique)
schemaUsuario.loadClass(Usuario)

module.exports=mongoose.model('usuario',schemaUsuario)