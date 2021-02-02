const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtObjetos = require('./routes/rtObjetos')
var exphbs  = require('express-handlebars')
const fileUpload = require('express-fileupload')
const conexion = require('./conexion')

//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())

//enrutador principal
app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/objetos',rtObjetos)

//base de datos mongodb
conexion.on('error',console.error.bind(console,'Error al conectar a mongo'))
conexion.once('open',()=>console.log("Conexión con Mongo OK!!"))

//arrancamos el servidor:
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})

//mongo --port 27017 -u "superAdmin" -p "pass1234" --authenticationDatabase "admin"