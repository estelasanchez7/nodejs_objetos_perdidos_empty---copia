const Usuario = require ('../models/Usuario')

let daoUsuarios={}

//guardar
daoUsuarios.guardar=function guardar(usuario){
    let u = new Usuario(usuario)
    //u.encriptar(u.password)
    u.save()
}

//eliminar

//modificar

module.exports = daoUsuarios
