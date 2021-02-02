const express = require('express')
const rtObjetos = express.Router()
const Objeto = require('../models/Objeto')
const daoObjetos = require('../dao/daoObjetos')

rtObjetos.get('/nuevo', function (req, res) {
    res.render('objetos/formulario')
})

rtObjetos.post('/guardar', function (req, res){
    //el body y el archivo llegan de formas diferentes:
        //el body sigue llegando en req.body
        //el archivo llega en req.files
    //para juntarlos, agregamos al body el nombre del archivo:
    req.body.foto=`/images/${req.files.foto.name}`
    //después llamamos al método "guardar" que nos devuelve una promesa
    daoObjetos.guardar(req.body)
        .then(resp=>{
            //movemos el archivo subido a la carpeta public
            let archivo = req.files.foto
            archivo.mv(`./public/images/${archivo.name}`,async (err) => {
                //if(err) return res.status(500).send({ message : err })
                let misObjetos = await daoObjetos.listado()
                res.render('listado', {objetosPerdidos:misObjetos})
                //res.render('home', {mensaje:"Objeto guardado con éxito"})
            })
        })
})

rtObjetos.get('/listado', async function (req, res){
    let misObjetos = await daoObjetos.listar()
    res.render('objetos/listado', {objetosPerdidos:misObjetos})
})

rtObjetos.get('/listar/:titulo', async function (req, res){
    let titulo=req.params.titulo
    let misObjetos = await daoObjetos.listarPorTitulo(titulo)
    res.render('listado', {objetosPerdidos:misObjetos})
})

/*rtMain.get('/usuarios/nuevo', function (req, res) {
    res.render()
})*/


module.exports=rtObjetos