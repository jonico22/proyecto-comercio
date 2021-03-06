const express = require('express');
const route = express.Router();

const CrontrollerCarrito = require('./controllerCarrito');
const objController = new CrontrollerCarrito();


route.get('/', async (req, res)=>{
    let list =  await objController.getAll(); 
    console.log(list)
    res.status(200).json(list);
})

route.get('/:id/productos',async (req, res)=>{
    console.log(req.params.id)
    let list =  await objController.getByIdProd(req.params.id); 
    if ( list === null) {
        res.status(200).json( {error: 'carrito no encontrado'});
    } else {
        res.status(200).json(list);
    }
})

route.get('/:id',async (req, res)=>{
    console.log(req.params.id)
    let list =  await objController.getById(req.params.id); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

route.delete('/:id',async (req, res)=>{
    let list = await objController.deleteById(req.params.id); 
    console.log(list,req.params.id)
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json({message : "eliminado"});
    }
})

route.delete('/:id/productos/:id_prod',async (req, res)=>{
    let list = await objController.deleteByIdProduct(req.params.id,req.params.id_prod); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json({message : "eliminado"});
    }
})

route.post('/', async (req, res)=>{
    let data =  req.body
    data['timestamp'] = Date.now()
    let resp = await objController.save(data)
    res.status(200).json( resp );   
})

route.post('/:id/productos', async (req, res)=>{
    let data =  req.body
    data['timestamp'] = Date.now()
    let resp = await objController.saveOne(data,req.params.id)
    res.status(200).json( resp );   
})

route.put('/:id',async (req, res)=>{
   
    let list = await objController.updateById(req.params.id,req.body); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

module.exports = route;