const fs = require('fs');

async function leerArchivo(ruta) {
    try {
        let resp =  await fs.promises.readFile(ruta, 'utf-8');
        return resp === '' ? [] : JSON.parse(resp)
    } catch (err) {
        console.log(err)
        return []
    }
}

async function grabarArchivo(ruta,newData) {
    try {
        await fs.promises.writeFile(ruta, newData);
    } catch (err) {
        throw new Error('No grabo el archivo');
    }
}

function searchId (file,id){
    let search = file.filter(elm =>parseInt(elm.id) === parseInt(id))[0]
    return search === undefined ? null : search
}


class CrontrollerCarrito {
    ruta
    constructor(){
        this.ruta = './carrito.txt'
    }
    async save(product){
        let file = await leerArchivo(this.ruta)
        let newId = file.length + 1
        let search = searchId(file,newId)
        if ( search === null) {
            product.id = newId
        } else {
            product.id = Math.max(...file.map( item=>item.id)) + 1
        }
        file.push(product)
        await grabarArchivo(this.ruta,JSON.stringify(file))
        return newId
    }

    async getById(id){
        let file = await leerArchivo(this.ruta)
        let result =  searchId(file,id)
        return result
    }

    async getAll(){
        let file = await leerArchivo(this.ruta)
        return file
    }


    async deleteById(id){
        let file = await leerArchivo(this.ruta)
        let result =  searchId(file,id)
        if (result === null) {
            return null
        } else {
            await grabarArchivo(this.ruta,JSON.stringify(file.filter(elm => parseInt(elm.id) !== parseInt(id))))
        }
    }

    async updateById(id,data){
        let file = await leerArchivo(this.ruta)
        let search = searchId(file,id)
        if ( search === null) {
            return null
        } else {
            let result = this.search.filter(elm => Number(elm.id) === Number(id))[0]
            data.productos !== undefined ? result.productos = data.productos :  null
            return this.search
        }
    }

    async deleteAll(){
        await grabarArchivo(this.ruta,'')
    }

}

module.exports = CrontrollerCarrito;



