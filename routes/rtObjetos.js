const express = require('express')
const rtObjetos = express.Router()
const Objeto = require('../models/Objeto')
const daoObjetos = require('../dao/daoObjetos')

rtObjetos.get('/nuevo', function (req, res) {
    res.render('objetos/formulario')
})

rtObjetos.post('/guardar', function (req, res) {
    if(req.files!=null){//has subido un archivo?
        let f = req.files.foto
        f.mv(`./public/images/${f.name}`,err => {
            if(err) console.log(err)
        })
        req.body.foto=req.files.foto.name
        /*el body y el archivo llegan de formas diferentes:
        el body sigue llegando en req.body
        el archivo llega en req.files
        para juntarlos, agregamos al body el nombre del archivo */       
    }
    daoObjetos.guardar(req.body) //después llamamos al método "guardar" que nos devuelve una promesa
        .then(resp=>{
            console.log(resp)
            res.render('objetos/formulario',)})
})

rtObjetos.get('/listado', async function (req, res) {
    let misObjetos = await daoObjetos.listar()
    console.log(misObjetos)
    res.render('objetos/listado',{objetosPerdidos: misObjetos})
})

/*rtObjetos.get('/listar/:titulo', async function (req, res){
    let titulo=req.params.titulo
    let misObjetos = await daoObjetos.listarPorTitulo(titulo)
    res.render('listado', {objetosPerdidos:misObjetos})
})*/


module.exports=rtObjetos