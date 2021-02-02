const mongoose = require("mongoose")
const {Schema} = mongoose
//const bcrypt = require('bcrypt')

const schemaUsuario = new Schema({
    nombre: {type:String},
    email: {type:String, required:true, unique: true, index: true}, //index sirve para que lo busque
    password: {type:String,required:true}
})

/*schemaUsuario.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash=>{
            this.password = hash
            next()
        })
})*/

class Usuario {
    //constructor

    //get y set
    get errores(){
        let errores=[]
        if(this.email=="") errores.push({error:"email vacío, es obligatorio."})
        if(this.password=="") errores.push({error:"password vacío, es obligatorio"})
        return errores
    }
    
/*
    //privados
    comprobarPwd(password){
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }*/
}

schemaUsuario.loadClass(Usuario)
module.export=mongoose.model('usuario',schemaUsuario)