const express = require('express');
const route = express.Router();

const CrontrollerProduct = require('./controllerProduct');
const objController = new CrontrollerProduct();
const permit = require("./auth");
const admin =  true

route.get('/', async (req, res)=>{
    let list =  await objController.getAll();
    res.status(200).json(list);
})

route.get('/:id', async (req, res)=>{
    let list = await objController.getById(req.params.id); 
    if ( list === null) {
        res.status(200).json( {error: 'producto no encontrado'});
    } else {
        res.status(200).json(list);
    }
    
})

route.delete('/:id',permit(admin), async (req, res)=>{
    
    let list = await objController.deleteById(req.params.id); 
    if ( list === null) {
        res.status(200).json( {status: false ,error: 'producto no encontrado'});
    } else {
        res.status(200).json( { status: true ,message : "eliminado"});
    }
    
})

route.post('/',permit(admin), async (req, res)=>{
    let data =  req.body
    data['timestamp'] = Date.now()
    let resp = await objController.save(data) 
    res.status(200).json( {
        data: resp,
        status: true
    });   
})

route.put('/:id',permit(admin), async (req, res)=>{
    let list = await objController.updateById(req.params.id,req.body); 
    if ( list === null) {
        res.status(200).json( {status: false,error: 'producto no encontrado'});
    } else {
        res.status(200).json({data:list, status: true});
    }
    
})

module.exports = route;