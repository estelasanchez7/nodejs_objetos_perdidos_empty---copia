const mongoose = require("mongoose")
const {Schema} = mongoose

const schemaObjeto = new Schema({
    nombre: {type:String, required:true},
    telefono: {type:String, required:true},
    titulo: {type:String},
    descripcion: {type: String},
    foto: {type:String, default:'/images/default.png'}
})

class Objeto {
    //constructor

    //get y set
    get errores(){
        let errores=[]
        if(this.nombre=="") errores.push({error:"El nombre introducido no es correcto, por favor, inserte uno válido."})
        if(this.telefono=="") errores.push({error:"El telefono introducido no es correcto, por favor, inserte uno válido."})
        return errores
    }

    //metodos otros
}

schemaObjeto.loadClass(Objeto)
module.exports=mongoose.model('Objeto',schemaObjeto)