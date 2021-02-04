const Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')
let daoUsuarios = {}

//guardar
daoUsuarios.guardar = function guardar(usuario) {
    return new Promise((resolved, reject) => {
        let u = new Usuario(usuario)
        u.save()
            .then(() => {
                //mailer.send(u.email)
                resolved("Información guardada con éxito. Revisa tu email para confirmar tus datos.")
            })
            .catch(err => resolved(err))
    })
}

daoUsuarios.getUsuarioByEmail = function getUsuarioByEmail(email) {
    return new Promise((resolve) => {
        resolve(Usuario.findOne({ email: email }))
    })

}

daoUsuarios.login = function login(credenciales) {
    return new Promise((resolved,reject) => {
        daoUsuarios.getUsuarioByEmail(credenciales.email)
            .then(async usuario => {
                if(usuario==null)
                resolved({resultado: false, mensaje:'El usuario no existe'})
                else{
                    let respuesta = await usuario.comprobarPwd(credenciales.password)
                    if(respuesta)
                    resolved({resultado: respuesta, mensaje:'Usuario correcto'})
                    else
                    resolved({resultado: respuesta, mensaje:'Password incorrecta'})
                } 
            })
            .catch(err=>reject(err))
    })
}

//obtener

//eliminar

//modificar

//listar



module.exports = daoUsuarios

